// Density probe. `npm run check` guards the overflow side of a frame; this guards the EMPTY side —
// a frame that builds green, reads correctly and leaves half its pane unused. It renders every
// section route in headless Chromium at 1920×1080 with ?capture=1 and measures the DOM against the
// density targets in CLAUDE.md:
//
//   slide   .slide-panel__scaler height ÷ .slide-panel height          0.80–0.95
//   bind    max(node-union width ÷ pane width, height ÷ pane height)   ≥ 0.85
//   area    node-union width × height ÷ pane area                      ≥ 0.55
//   eyebrow no .react-flow__node overlapping .reel-head__eyebrow        clear
//
// These are TARGETS, not thresholds (CLAUDE.md). A board that is sparse on purpose says so in its
// section file with a `// density-accept: <reason>` comment, and is reported ACCEPTED, not FAIL.
// Edge labels landing on cards are not measured here — look at the route.
//
//   npm run density                 every course
//   npm run density -- first-dag    one course (or several)
//   npm run density -- --shots .tmp/shots   also save a 1920×1080 PNG per route
//
// A route that throws, or renders no scene, is a FAIL row rather than the end of the run.
//
// Chromium: puppeteer's own download, or PUPPETEER_EXECUTABLE_PATH when the download was skipped.
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createServer } from 'vite'
import puppeteer from 'puppeteer'

const SLIDE = [0.8, 0.95]
const BIND_MIN = 0.85
const AREA_MIN = 0.55

// Routes by convention: src/content/<course>/NN-<section>.ts ⇄ #/<course>-<section>.
const argv = process.argv.slice(2)
const shotsAt = argv.indexOf('--shots')
const shots = shotsAt >= 0 ? argv[shotsAt + 1] : null
const only = argv.filter((a, i) => shotsAt < 0 || (i !== shotsAt && i !== shotsAt + 1))
if (shots) mkdirSync(shots, { recursive: true })
const sections = readdirSync('src/content', { withFileTypes: true })
  .filter((d) => d.isDirectory() && (!only.length || only.includes(d.name)))
  .flatMap((d) =>
    readdirSync(join('src/content', d.name))
      .filter((f) => /^\d+-.+\.ts$/.test(f))
      .sort()
      .map((f) => {
        const src = readFileSync(join('src/content', d.name, f), 'utf8')
        const id = (src.match(/\bid: '([\w-]+)',/) || [])[1]
        const accept = (src.match(/\/\/ density-accept: (.+)/) || [])[1]
        if (!id) throw new Error(`no \`id: '…'\` in src/content/${d.name}/${f}`)
        return { route: `${d.name}-${id}`, accept }
      }),
  )
if (!sections.length) {
  console.error(`✗ no sections found${only.length ? ` for: ${only.join(', ')}` : ''}`)
  process.exit(1)
}

const server = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'error' })
await server.listen()
const browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

const rows = []
try {
  for (const { route, accept } of sections) {
    errors.length = 0
    await page.goto(`http://localhost:5199/?capture=1#/${route}`, { waitUntil: 'networkidle0' })
    const rendered = await page.waitForSelector('.react-flow__node', { timeout: 10000 }).then(() => true, () => false)
    if (!rendered) {
      rows.push({ route, misses: [errors[0] ? `page error: ${errors[0]}` : 'no scene rendered'], accept, verdict: 'FAIL' })
      continue
    }
    await new Promise((r) => setTimeout(r, 800)) // fitView settles after the first paint
    if (shots) await page.screenshot({ path: join(shots, `${route}.png`) })
    const m = await page.evaluate(() => {
      const R = (e) => e.getBoundingClientRect()
      const pane = R(document.querySelector('.react-flow'))
      const panel = R(document.querySelector('.slide-panel'))
      const scaler = R(document.querySelector('.slide-panel__scaler'))
      // The eyebrow LABEL, not the .reel-head strip: the strip spans the whole scene pane, so testing
      // it flags any board that reaches the top edge, under the label or not.
      const head = document.querySelector('.reel-head__eyebrow')
      const nodes = [...document.querySelectorAll('.react-flow__node')].map(R)
      const x0 = Math.min(...nodes.map((n) => n.left)), x1 = Math.max(...nodes.map((n) => n.right))
      const y0 = Math.min(...nodes.map((n) => n.top)), y1 = Math.max(...nodes.map((n) => n.bottom))
      const w = (x1 - x0) / pane.width, h = (y1 - y0) / pane.height
      const hb = head && R(head)
      return {
        slide: scaler.height / panel.height,
        bind: Math.max(w, h),
        area: w * h,
        eyebrow: !hb || !nodes.some((n) => n.top < hb.bottom && n.bottom > hb.top && n.left < hb.right && n.right > hb.left),
      }
    })
    const misses = [
      (m.slide < SLIDE[0] || m.slide > SLIDE[1]) && 'slide',
      m.bind < BIND_MIN && 'bind',
      m.area < AREA_MIN && 'area',
      !m.eyebrow && 'eyebrow',
    ].filter(Boolean)
    // A page error is a broken frame, not a sparse one, so density-accept does not cover it.
    if (errors.length) {
      rows.push({ route, ...m, misses: [...misses, `page error: ${errors[0]}`], accept, verdict: 'FAIL' })
      continue
    }
    rows.push({ route, ...m, misses, accept, verdict: !misses.length ? 'PASS' : accept ? 'ACCEPTED' : 'FAIL' })
  }
} finally {
  await browser.close()
  await server.close()
}

const pct = (v) => v.toFixed(2)
console.log('verdict    slide  bind  area  eyebrow  route')
for (const r of rows) {
  if (r.slide == null) {
    console.log(`${r.verdict.padEnd(9)}  ${'—'.padEnd(29)}  ${r.route}  ← ${r.misses.join(', ')}`)
    continue
  }
  const note = r.misses.length ? `  ← ${r.misses.join(', ')}${r.accept ? ` (accepted: ${r.accept})` : ''}` : ''
  console.log(
    `${r.verdict.padEnd(9)}  ${pct(r.slide)}   ${pct(r.bind)}  ${pct(r.area)}  ${(r.eyebrow ? 'clear' : 'HIT').padEnd(7)}  ${r.route}${note}`,
  )
}
const failed = rows.filter((r) => r.verdict === 'FAIL').length
console.log(failed ? `\n✗ ${failed} of ${rows.length} frame(s) under the density targets` : `\n✓ ${rows.length} frame(s) within density targets`)
process.exit(failed ? 1 : 0)
