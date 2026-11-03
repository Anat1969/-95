// Playwright check of /walk against `next start` (port 3095).
// walk.js and ai-menu.js are served from a local AppOfApp-GH checkout (the cloud cannot reach vercel.app).
// Run: npx next start -p 3095 & node tests/walk.e2e.mjs
import { chromium } from 'playwright'
import { readFileSync, mkdirSync } from 'fs'

const BASE = process.env.BASE || 'http://localhost:3095'
const AOA = process.env.AOA || '../AppOfApp-GH/public'
const SHOTS = process.env.SHOTS || 'tests/shots'
mkdirSync(SHOTS, { recursive: true })
let fails = 0
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++ }

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
async function open(opts, path) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.route('https://appofapp-gh.vercel.app/walk.js', (r) => r.fulfill({ contentType: 'text/javascript', body: readFileSync(`${AOA}/walk.js`) }))
  await page.route('https://appofapp-gh.vercel.app/ai-menu.js', (r) => r.fulfill({ contentType: 'text/javascript', body: readFileSync(`${AOA}/ai-menu.js`) }))
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  return { ctx, page, errors }
}
const sw = (page, sel) => page.locator('space-walk').locator(sel)
const insight = (page) => sw(page, '.insight').innerText()

{
  const { ctx, page, errors } = await open({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, '/walk')
  await page.waitForFunction(() => {
    const m = document.querySelector('space-walk')?.shadowRoot?.querySelector('.msg'); return m && m.hidden
  }, null, { timeout: 30000 })
  ok(true, '3D loaded (three.js from jsdelivr)')
  ok((await insight(page)).includes('5 מתוך 5'), 'child 95 cm, common: 5 of 5 block -> ' + (await insight(page)))
  ok((await sw(page, '.heights').innerText()).includes('4 חוסמים'), 'height buttons show 4 at 120 cm')
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${SHOTS}/walk-95-common.png` })

  await sw(page, '[data-eye="160"]').click()
  ok((await insight(page)).includes('1 מתוך 5'), 'adult 160 cm: 1 of 5 -> ' + (await insight(page)))
  ok(page.url().includes('eye=160') && page.url().includes('v=common'), 'address keeps the state: ' + page.url())

  await sw(page, '[data-eye="95"]').click()
  await sw(page, '[data-variant="guide"]').click()
  ok((await insight(page)).includes('רואים הכול'), 'guidelines at 95 cm: nothing blocks -> ' + (await insight(page)))
  ok((await sw(page, '.checks').innerText()).includes('תואם'), 'measurements list shows matches')
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${SHOTS}/walk-95-guide.png` })

  // walking: hold forward moves through the gate area; keyboard turns
  const before = await page.evaluate(() => ({ ...document.querySelector('space-walk')._pos }))
  await sw(page, '.gl').click({ position: { x: 300, y: 300 } })
  await page.keyboard.down('ArrowDown'); await page.waitForTimeout(700); await page.keyboard.up('ArrowDown')
  const after = await page.evaluate(() => ({ ...document.querySelector('space-walk')._pos }))
  ok(after.z > before.z + 0.3, `keyboard walks (z ${before.z.toFixed(2)} -> ${after.z.toFixed(2)})`)

  // list row turns the view toward the element; principle link points to its page
  await sw(page, '[data-id="planter"]').click()
  await page.waitForTimeout(900)
  ok(await sw(page, '[data-id="planter"] a').getAttribute('href') === '/principles/sightline', 'row links to its principle')
  await page.screenshot({ path: `${SHOTS}/walk-look-planter.png` })

  await sw(page, '[data-view="top"]').click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${SHOTS}/walk-top.png` })
  // from above the canvas really drew a scene (not one flat colour)
  const varied = await page.evaluate(() => {
    const c = document.querySelector('space-walk').shadowRoot.querySelector('.gl')
    const t = document.createElement('canvas'); t.width = 64; t.height = 64
    const g = t.getContext('2d'); g.drawImage(c, 0, 0, 64, 64)
    const d = g.getImageData(0, 0, 64, 64).data; const s = new Set()
    for (let i = 0; i < d.length; i += 4) s.add(d[i] >> 4 << 8 | d[i + 1] >> 4 << 4 | d[i + 2] >> 4)
    return s.size
  })
  ok(varied > 12, 'WebGL canvas has a drawn scene (' + varied + ' colour buckets)')

  ok(page.url().includes('view=top'), 'top view in the address')

  // reopening the copied address restores it
  const { ctx: c2, page: p2 } = await open({ viewport: { width: 1440, height: 900 } }, '/walk?eye=120&v=common')
  await p2.waitForFunction(() => document.querySelector('space-walk')?.shadowRoot?.querySelector('.insight')?.textContent)
  ok((await insight(p2)).includes('120') && (await insight(p2)).includes('4 מתוך 5'), 'address restores 120 cm common -> ' + (await insight(p2)))
  await c2.close()

  ok(errors.length === 0, 'no page errors ' + errors.join(' | '))
  await ctx.close()
}

{
  const { ctx, page, errors } = await open({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, '/walk')
  await page.waitForTimeout(2500)
  const sx = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  ok(sx <= 0, 'mobile: no horizontal scroll (' + sx + ')')
  await page.screenshot({ path: `${SHOTS}/walk-mobile.png`, fullPage: true })
  ok(errors.length === 0, 'mobile: no page errors ' + errors.join(' | '))
  await ctx.close()
}

{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 } }, '/')
  ok(await page.locator('a[href="/walk"]').count() >= 2, 'home hero and top bar link to /walk')
  await page.screenshot({ path: `${SHOTS}/home.png` })
  await ctx.close()
}

await browser.close()
console.log(fails ? `${fails} FAILED` : 'ALL PASS')
process.exit(fails ? 1 : 0)
