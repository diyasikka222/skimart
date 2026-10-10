/* SKIMART storefront smoke test.
 * Uses the locally installed Google Chrome (playwright-core, no browser download).
 * Run: node scripts/smoke.js  (start `npm run dev` first, or set SMOKE_BASE_URL)
 */
import { chromium } from 'playwright-core'

const BASE = process.env.SMOKE_BASE_URL ?? 'http://localhost:5199'
const results = []
const failures = []

function check(name, ok, detail = '') {
  results.push({ name, ok })
  if (!ok) failures.push(name)
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : detail ? ` — ${detail}` : ''}`)
}

async function shot(page, name) {
  await page.screenshot({ path: `scripts/artifacts/${name}.png`, fullPage: true })
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))

  const cartBadge = () =>
    page.locator('button[aria-label^="Open cart"]').locator('span[aria-hidden="true"]').first()

  // --- Homepage ---
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('homepage hero headline', await page.getByRole('heading', { name: /all in one place/i }).first().isVisible())
  check('Shop by category section', await page.getByRole('heading', { name: 'Shop by category' }).isVisible())
  check('Everyday favourites section', await page.getByRole('heading', { name: 'Everyday favourites' }).isVisible())
  check('store trust section', await page.getByRole('heading', { name: 'A local store you can count on' }).isVisible())
  check('product cards present', (await page.locator('article').count()) > 0)
  check('no horizontal overflow (desktop)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await shot(page, 'home-desktop')

  // --- Mobile ---
  await page.setViewportSize({ width: 380, height: 800 })
  await page.waitForTimeout(300)
  check('no horizontal overflow (mobile)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  check('mobile search visible', await page.getByRole('search').first().isVisible())
  await shot(page, 'home-mobile')
  await page.setViewportSize({ width: 1440, height: 900 })

  // --- Search ---
  await page.getByRole('search').first().locator('input').fill('milk')
  await page.getByRole('search').first().locator('input').press('Enter')
  await page.waitForURL(/\/search/)
  check('search heading with query', await page.getByRole('heading', { name: /Results for/i }).isVisible())
  check('search returns products', (await page.locator('article').count()) > 0)
  await shot(page, 'search')

  // --- Empty search state ---
  await page.goto(BASE + '/search?q=zzzznothing', { waitUntil: 'networkidle' })
  check('search empty state', await page.getByText(/No results for/i).isVisible())

  // --- Category page ---
  await page.goto(BASE + '/category/dairy-eggs', { waitUntil: 'networkidle' })
  check('category heading', await page.getByRole('heading', { name: 'Dairy & Eggs' }).first().isVisible())
  check('category products', (await page.locator('article').count()) > 0)
  await shot(page, 'category')

  // --- Product page + add to cart ---
  await page.goto(BASE + '/product/amul-taaza-toned-milk-500ml', { waitUntil: 'networkidle' })
  check('product heading', await page.getByRole('heading', { name: 'Amul Taaza Toned Milk' }).isVisible())
  const addBtn = page.getByRole('button', { name: /Add Amul Taaza Toned Milk to cart/i })
  check('add to cart button', await addBtn.isVisible())
  await addBtn.click()
  await page.waitForTimeout(400)
  check('cart badge shows 1', (await cartBadge().textContent()) === '1')
  check('toast shown after add', await page.getByText(/added to your cart/i).first().isVisible())
  await shot(page, 'product')

  // --- Cart drawer ---
  await page.getByRole('button', { name: /Open cart/i }).click()
  check('cart dialog opens', await page.getByRole('dialog', { name: 'Your cart' }).isVisible())
  check('cart lists product', await page.getByRole('dialog').getByText('Amul Taaza Toned Milk').isVisible())
  await page.keyboard.press('Escape')

  // --- Add from homepage card + quantity stepper ---
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /to cart$/ }).first().click()
  await page.waitForTimeout(300)
  const stepper = page.getByRole('group', { name: /Quantity of/i }).first()
  check('quantity stepper appears', await stepper.isVisible())
  await stepper.getByRole('button', { name: /Increase/i }).click()
  await page.waitForTimeout(200)
  check('cart badge increments to 3', (await cartBadge().textContent()) === '3')

  // --- Favourites ---
  await page.getByRole('button', { name: /to favourites/i }).first().click()
  await page.waitForTimeout(250)
  check('favourite toggle works', await page.getByRole('button', { name: /from favourites/i }).first().isVisible())

  // --- Location selector ---
  await page.getByRole('button', { name: /Select delivery location/i }).first().click()
  check('location dialog opens', await page.getByRole('dialog', { name: /Choose delivery location/i }).isVisible())
  await page.getByRole('button', { name: /Apply location/i }).click()

  // --- Info + 404 ---
  await page.goto(BASE + '/faq', { waitUntil: 'networkidle' })
  check('faq renders', await page.getByRole('heading', { name: /Frequently asked questions/i }).isVisible())
  await page.goto(BASE + '/nope-route', { waitUntil: 'networkidle' })
  check('404 renders', await page.getByRole('heading', { name: 'Page not found' }).isVisible())

  check('no console/page errors', consoleErrors.length === 0, consoleErrors.slice(0, 4).join(' | '))
} catch (err) {
  check('test run completed', false, String(err))
} finally {
  await browser.close()
}

console.log(`\n${results.length - failures.length}/${results.length} checks passed`)
if (failures.length > 0) process.exit(1)