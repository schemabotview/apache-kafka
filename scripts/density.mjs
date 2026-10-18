// Density report — the half of the frame budget `npm run check` does not model. `check` fails a
// slide that overflows; nothing fails a frame that builds green, reads correctly and leaves half its
// pane empty. This measures every section ON THE RENDERED ROUTE against the targets in CLAUDE.md:
//
//   slide   rendered height 865–1025 design px (80–95 % of the ~1080 pane); `check` caps it at 1000
//   scene   binding axis ≥ 0.85 of the scene pane — the board reaches the edge it is limited by
//   scene   area ≥ 0.55 of the scene pane (w × h of the node union)
//   eyebrow no node under the top-left eyebrow label
//
// Targets, not thresholds: a deliberately sparse board can sit under them. So the report always
// exits 0 unless a slide is actually CLIPPED (content past the bottom of its panel), which is a
// failure on any reading. `--strict` exits 1 on any miss.
//
// Needs the dev server: `npm run dev` in one terminal, then
//   npm run density                         every section
//   npm run density -- events-logs          one course
//   npm run density -- --shots .tmp/shots   also save a 1920×1080 PNG per route
//   BASE=http://localhost:5174 npm run density
//
// Routes are read off src/content the way `check` reads it: course id = folder name, section
// order = the NN- file prefix, section id = the file's `id:`.
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const SLIDE_MIN = 865
const SLIDE_MAX = 1025
const BIND_MIN = 0.85
const AREA_MIN = 0.55
const SLIDE_DESIGN_W = 806 // useSlideScale: zoom = paneWidth / 806

const args = process.argv.slice(2)
const strict = args.includes('--strict')
const shotsAt = args.indexOf('--shots')
const shots = shotsAt >= 0 ? args[shotsAt + 1] : null
const only = args.filter((a, i) => !a.startsWith('--') && i !== shotsAt + 1)
const base = process.env.BASE ?? 'http://localhost:5173'

const routes = []
for (const course of readdirSync('src/content').sort()) {
  const dir = join('src/content', course)
  if (course.endsWith('.ts') || (only.length && !only.includes(course))) continue
  for (const f of readdirSync(dir).filter((f) => /^\d+-.*\.ts$/.test(f)).sort()) {
    const id = (readFileSync(join(dir, f), 'utf8').match(/\bid: '([\w-]+)',/) || [])[1]
    if (id) routes.push(`${course}-${id}`)
  }
}
if (!routes.length) {
  console.error('✗ no sections found' + (only.length ? ` for ${only.join(', ')}` : ''))
  process.exit(1)
}
if (shots) mkdirSync(shots, { recursive: true })

// Chrome refuses its sandbox as root, which is what CI runners and cloud containers are.
const browser = await puppeteer.launch({ args: process.getuid?.() === 0 ? ['--no-sandbox'] : [] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

const rows = []
for (const route of routes) {
  errors.length = 0
  await page.goto(`${base}/?capture=1#/${route}`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('.react-flow__node', { timeout: 10000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 800)) // fitView settles after first paint
  if (shots) await page.screenshot({ path: join(shots, `${route}.png`) })

  const m = await page.evaluate((designW) => {
    const rect = (el) => el?.getBoundingClientRect()
    const pane = rect(document.querySelector('.scene-area'))
    const panel = rect(document.querySelector('.slide-panel'))
    const scaler = document.querySelector('.slide-panel__scaler')
    const eyebrow = rect(document.querySelector('.reel-head__eyebrow'))
    // Top-level nodes only: a container's box already contains its children.
    const nodes = [...document.querySelectorAll('.react-flow__node')]
      .filter((n) => !n.parentElement.closest('.react-flow__node'))
      .map(rect)
    if (!pane || !panel || !scaler || !nodes.length) return null
    const u = {
      l: Math.min(...nodes.map((r) => r.left)),
      t: Math.min(...nodes.map((r) => r.top)),
      r: Math.max(...nodes.map((r) => r.right)),
      b: Math.max(...nodes.map((r) => r.bottom)),
    }
    const kids = [...scaler.children].map(rect)
    const zoom = panel.width / designW
    const top = Math.min(...kids.map((r) => r.top))
    const bottom = Math.max(...kids.map((r) => r.bottom))
    const under = (r) => eyebrow && r.left < eyebrow.right && r.right > eyebrow.left && r.top < eyebrow.bottom && r.bottom > eyebrow.top
    return {
      slide: (bottom - top) / zoom,
      clipped: bottom > panel.bottom + 1,
      w: (u.r - u.l) / pane.width,
      h: (u.b - u.t) / pane.height,
      eyebrow: nodes.some(under),
    }
  }, SLIDE_DESIGN_W)

  if (!m) {
    rows.push({ route, misses: [errors[0] ? `render error: ${errors[0]}` : 'scene or slide did not render'], fail: true })
    continue
  }
  const bind = Math.max(m.w, m.h)
  const area = m.w * m.h
  const misses = []
  if (m.clipped) misses.push('slide CLIPS')
  else if (m.slide > SLIDE_MAX) misses.push(`slide > ${SLIDE_MAX}`)
  if (m.slide < SLIDE_MIN) misses.push(`slide < ${SLIDE_MIN}`)
  if (bind < BIND_MIN) misses.push(`binding < ${BIND_MIN}`)
  if (area < AREA_MIN) misses.push(`area < ${AREA_MIN}`)
  if (m.eyebrow) misses.push('node under eyebrow')
  if (errors.length) misses.push(`page error: ${errors[0]}`)
  rows.push({ route, ...m, bind, area, misses, fail: m.clipped || errors.length > 0 })
}
await browser.close()

const pad = Math.max(...rows.map((r) => r.route.length))
console.log(`${'route'.padEnd(pad)}   slide  w×h        bind  area  `)
for (const r of rows) {
  const nums = r.slide == null ? ''.padEnd(37) : `${String(Math.round(r.slide)).padStart(5)}  ${r.w.toFixed(2)}×${r.h.toFixed(2)}  ${r.bind.toFixed(2)}  ${r.area.toFixed(2)}  `
  console.log(`${r.misses.length ? '✗' : '✓'} ${r.route.padEnd(pad)} ${nums}${r.misses.join(' · ')}`)
}
const missed = rows.filter((r) => r.misses.length).length
console.log(`\n${rows.length - missed}/${rows.length} sections on target` + (shots ? ` · screenshots in ${shots}` : ''))
process.exit(rows.some((r) => r.fail) || (strict && missed) ? 1 : 0)
