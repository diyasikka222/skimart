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

  const opaqueAncestorBg = (selector) =>
    page.evaluate((sel) => {
      let el = document.querySelector(sel)
      while (el) {
        const bg = getComputedStyle(el).backgroundColor
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
        el = el.parentElement
      }
      return null
    }, selector)

  const gridRowsEven = (selector) =>
    page.evaluate((sel) => {
      const grid = document.querySelector(sel)
      const kids = grid ? [...grid.children] : []
      const byRow = new Map()
      for (const k of kids) {
        const top = Math.round(k.getBoundingClientRect().top / 6)
        byRow.set(top, (byRow.get(top) ?? 0) + 1)
      }
      const counts = [...byRow.values()]
      return kids.length > 0 && counts.every((c) => c === counts[0])
    }, selector)

  // --- Homepage ---
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })

  // --- Welcome modal: shown once per session ---
  check('welcome modal shows on first visit', await page.getByRole('dialog', { name: /Welcome to SKIMART/i }).isVisible())
  check('welcome dialog is centered both ways', await page.evaluate(() => {
    const el = document.querySelector('[role="dialog"][aria-modal="true"]')
    if (!el) return false
    const rect = el.getBoundingClientRect()
    const dx = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2)
    const dy = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
    return dx < 2 && dy < 2
  }))
  check('welcome backdrop blurs the page behind', await page.evaluate(() => {
    const el = document.querySelector('[data-welcome-backdrop]')
    return !!el && (getComputedStyle(el).backdropFilter || '').includes('blur')
  }))
  check('welcome dialog has a subtle shadow', await page.evaluate(() => {
    const el = document.querySelector('[data-welcome-dialog]')
    return !!el && getComputedStyle(el).boxShadow !== 'none'
  }))
  check('welcome modal has explore button', await page.getByRole('button', { name: /Let's explore/i }).isVisible())
  await page.getByRole('button', { name: /Let's explore/i }).click()
  await page.waitForTimeout(200)
  check('welcome modal dismisses on explore', (await page.getByRole('dialog', { name: /Welcome to SKIMART/i }).count()) === 0)
  check('welcome backdrop removed once modal closes', await page.evaluate(() => {
    return document.querySelectorAll('[data-welcome-backdrop]').length === 0
  }))
  await page.reload({ waitUntil: 'networkidle' })
  check('welcome modal stays dismissed within the session', (await page.getByRole('dialog', { name: /Welcome to SKIMART/i }).count()) === 0)
  await page.evaluate(() => window.sessionStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
  check('welcome modal reappears in a new session', await page.getByRole('dialog', { name: /Welcome to SKIMART/i }).isVisible())
  await page.getByRole('button', { name: /Let's explore/i }).click()
  await page.waitForTimeout(200)
  check('welcome modal dismissed again', (await page.getByRole('dialog', { name: /Welcome to SKIMART/i }).count()) === 0)

  check('homepage hero headline', await page.getByRole('heading', { level: 1 }).first().isVisible())
  check('logo uses favicon.svg image', await page.evaluate(() => {
    const img = document.querySelector('a[aria-label^="SKIMART"] img')
    return !!img && (img.getAttribute('src') || '').includes('/favicon.svg')
  }))
  check('favicon.svg asset loads', (await (await context.request.get(BASE + '/favicon.svg')).status()) === 200)
  check('logo icon has no opaque background plate', await page.evaluate(async () => {
    const img = document.querySelector('a[aria-label^="SKIMART"] img')
    if (!img) return false
    const rect = img.getBoundingClientRect()
    const c = document.createElement('canvas')
    c.width = Math.max(1, Math.round(rect.width))
    c.height = Math.max(1, Math.round(rect.height))
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0, c.width, c.height)
    const p = ctx.getImageData(0, 0, 1, 1).data
    return p[3] < 40
  }))
  check('favicon.svg has no black background plate', await (async () => {
    const txt = await (await context.request.get(BASE + '/favicon.svg')).text()
    return !txt.includes('fill="#100F0F"') && !txt.includes('width="1560"')
  })())
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur())
  await page.click('#search-header')
  await page.waitForTimeout(400)
  check('search focus uses refined green border (no orange/red)', await page.evaluate(() => {
    const form = document.querySelector('form[role="search"]')
    if (!form) return false
    const cs = getComputedStyle(form)
    return cs.borderTopColor === 'rgb(36, 92, 56)' && cs.borderRightColor === 'rgb(36, 92, 56)'
  }))
  check('search input has no orange/red focus outline (mouse)', await page.evaluate(() => {
    const input = document.querySelector('#search-header')
    if (!input) return false
    const cs = getComputedStyle(input)
    const suppressed = cs.outlineStyle === 'none' || cs.outlineWidth === '0px' || cs.outlineColor === 'rgba(0, 0, 0, 0)'
    return suppressed && cs.outlineColor !== 'rgb(242, 140, 40)'
  }))
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur())
  await page.focus('#search-header')
  await page.waitForTimeout(200)
  check('search input has no orange/red focus outline (keyboard/focus-visible)', await page.evaluate(() => {
    const input = document.querySelector('#search-header')
    if (!input) return false
    const cs = getComputedStyle(input)
    return cs.outlineStyle === 'none' || cs.outlineWidth === '0px' || cs.outlineColor === 'rgba(0, 0, 0, 0)'
  }))
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur())
  check('logo wordmark colours match logo icon', await page.evaluate(() => {
    const link = document.querySelector('a[aria-label^="SKIMART"]')
    const wordmark = link?.querySelector('span')
    const mart = wordmark?.querySelector('span')
    if (!wordmark || !mart) return false
    return (
      getComputedStyle(wordmark).color === 'rgb(56, 143, 70)' &&
      getComputedStyle(mart).color === 'rgb(246, 149, 29)'
    )
  }))
  check('header: top bar is fixed to the top', await page.evaluate(() => {
    const fixed = document.querySelector('[data-fixed-top]')
    return (
      !!fixed &&
      getComputedStyle(fixed).position === 'fixed' &&
      Math.round(fixed.getBoundingClientRect().top) === 0
    )
  }))
  check('header: service strip is part of the fixed top bar', await page.evaluate(() => {
    const fixed = document.querySelector('[data-fixed-top]')
    return !!fixed?.querySelector('[data-service-strip]')
  }))
  check('header: spacer reserves navbar+strip height (no overlap)', await page.evaluate(() => {
    const fixed = document.querySelector('[data-fixed-top]')
    const spacer = document.querySelector('[data-nav-spacer]')
    if (!fixed || !spacer) return false
    return (
      spacer.getAttribute('aria-hidden') === 'true' &&
      spacer.getBoundingClientRect().height > 0 &&
      Math.abs(spacer.getBoundingClientRect().height - fixed.getBoundingClientRect().height) < 1
    )
  }))
  check('header: stays pinned after scrolling', await page.evaluate(async () => {
    const fixed = document.querySelector('[data-fixed-top]')
    if (!fixed) return false
    window.scrollTo(0, 600)
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
    const top = Math.round(fixed.getBoundingClientRect().top)
    window.scrollTo(0, 0)
    return top === 0
  }))
  check('header: first content sits below fixed header (not hidden)', await page.evaluate(() => {
    const fixed = document.querySelector('[data-fixed-top]')
    const below = fixed?.nextElementSibling
    if (!fixed || !below) return false
    return Math.round(below.getBoundingClientRect().top) >= Math.round(fixed.getBoundingClientRect().height) - 1
  }))
  check('Shop by category section', await page.getByRole('heading', { name: 'Shop by category' }).isVisible())
  check('home category grid rows are even', await gridRowsEven('[data-category-grid]'))
  check('Everyday favourites section', await page.getByRole('heading', { name: 'Everyday favourites' }).isVisible())
  check('store trust section', await page.getByRole('heading', { name: 'A local store you can count on' }).isVisible())
  check('product cards present', (await page.locator('article').count()) > 0)
  check('no horizontal overflow (desktop)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  check('large CTA buttons are at least 44px tall', await page.evaluate(() => {
    const btn = [...document.querySelectorAll('a, button')].find((el) =>
      /shop groceries/i.test(el.textContent || ''),
    )
    return !!btn && btn.getBoundingClientRect().height >= 44
  }))
  await shot(page, 'home-desktop')

  // --- Mobile ---
  await page.setViewportSize({ width: 380, height: 800 })
  await page.waitForTimeout(300)
  check('no horizontal overflow (mobile)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  check('mobile search visible', await page.getByRole('search').first().isVisible())
  check('interactive controls have >=32px touch targets (mobile)', await page.evaluate(() => {
    for (const el of document.querySelectorAll('button, input, select, a[aria-label]')) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (getComputedStyle(el).position === 'fixed') continue
      if (el.tagName === 'A' && (el.textContent || '').trim().length > 0) continue
      if (rect.height < 32) return false
    }
    return true
  }))
  await shot(page, 'home-mobile')

  // --- Responsive sweep: no horizontal overflow across common widths ---
  let responsiveOk = true
  for (const width of [320, 360, 375, 390, 414, 480, 640, 768, 1024, 1280, 1920, 2560]) {
    await page.setViewportSize({ width, height: 900 })
    await page.waitForTimeout(120)
    const ok = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    )
    if (!ok) {
      responsiveOk = false
      console.log(`      (horizontal overflow at ${width}px)`)
    }
  }
  check('no horizontal overflow across widths (320-2560)', responsiveOk)
  await page.setViewportSize({ width: 1440, height: 900 })

  // --- Search ---
  await page.getByRole('search').first().locator('input').fill('milk')
  await page.getByRole('search').first().locator('input').press('Enter')
  await page.waitForURL(/\/search/)
  await page.waitForTimeout(250)
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

  // --- Categories index ---
  await page.goto(BASE + '/categories', { waitUntil: 'networkidle' })
  check('categories index heading', await page.getByRole('heading', { name: 'Shop by category' }).first().isVisible())
  check('categories index shows all categories', (await page.locator('[data-category-grid] > *').count()) === 16)
  check('categories index rows are even', await gridRowsEven('[data-category-grid]'))
  await shot(page, 'categories-index')

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
  check('cart drawer checkout link', (await page.getByRole('dialog').getByRole('link', { name: /Proceed to checkout/i }).getAttribute('href')) === '/checkout')
  check('cart drawer full-cart link', (await page.getByRole('dialog').getByRole('link', { name: /View full cart/i }).getAttribute('href')) === '/cart')
  await page.getByRole('dialog').getByRole('link', { name: /Proceed to checkout/i }).click()
  await page.waitForURL(/\/checkout/)
  await page.waitForTimeout(300)
  check('cart drawer dismisses on proceed to checkout', (await page.getByRole('dialog', { name: 'Your cart' }).count()) === 0)
  check('checkout page shown after drawer closes', await page.getByRole('heading', { name: /Checkout/i }).first().isVisible())

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

  async function fillDeliveryForm(pg) {
    await pg.getByLabel('Full name').fill('Demo Customer')
    await pg.getByLabel('Mobile number').fill('9876543210')
    await pg.getByLabel('House / flat number').fill('12, Main Road')
    await pg.getByLabel('Street / locality').fill('Pratap Nagar')
    await pg.getByLabel('PIN code').fill('177203')
  }

  // --- Promotional cards (original designs) + landing hero background ---
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  check('promo: Fresh from the store card', await page.getByRole('heading', { name: 'Fresh from the store' }).isVisible())
  check('promo: Household essentials card', await page.getByRole('heading', { name: 'Household essentials' }).isVisible())
  check('promo: Snacks for every craving card', await page.getByRole('heading', { name: 'Snacks for every craving' }).isVisible())
  check('promo: fresh CTA category', (await page.getByRole('link', { name: /Shop fresh produce/i }).first().getAttribute('href')) === '/category/fruits-vegetables')
  check('promo: household CTA category', (await page.getByRole('link', { name: /Shop household/i }).first().getAttribute('href')) === '/category/home-cleaning')
  check('promo: snacks CTA category', (await page.getByRole('link', { name: /Shop snacks/i }).first().getAttribute('href')) === '/category/snacks-namkeen')
  check('promo: cards restored to original imagery', await page.evaluate(() => {
    const section = document.querySelector('section[aria-label="Featured shopping categories"]')
    return !!section && !section.querySelector('[style*="skimart-sunset-background"]') && section.querySelectorAll('img').length >= 3
  }))
  check('hero: restored to original card (no sunset bg)', await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Featured groceries"]')
    if (!el) return false
    const cs = getComputedStyle(el)
    return !cs.backgroundImage.includes('skimart-sunset') && cs.backgroundColor === 'rgb(23, 63, 40)'
  }))
  check('landing: sunset applied as page background', await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    return !!el && getComputedStyle(el).backgroundImage.includes('skimart-sunset-background')
  }))
  check('landing: background is a viewport-fixed cover layer, unfaded', await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    if (!el) return false
    const cs = getComputedStyle(el)
    return (
      cs.position === 'fixed' &&
      cs.zIndex === '-10' &&
      cs.backgroundSize === 'cover' &&
      cs.backgroundRepeat === 'no-repeat' &&
      cs.backgroundAttachment === 'scroll' &&
      cs.opacity === '1'
    )
  }))
  check('landing: no fade/tint overlay layer', await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    const parent = el?.parentElement
    if (!el || !parent) return false
    return Array.from(parent.children).every(
      (child) => child === el || !/bg-white|via-|from-|to-|gradient/i.test(child.className || ''),
    )
  }))
  check('landing: layout establishes stacking context', await page.evaluate(() => {
    const root = document.querySelector('main')?.parentElement
    return !!root && getComputedStyle(root).isolation === 'isolate'
  }))
  check('landing: background spans full page width', await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    if (!el) return false
    const r = el.getBoundingClientRect()
    return r.width >= window.innerWidth - 1 && Math.round(r.left) === 0
  }))
  check('landing: only one page background layer', await page.evaluate(() => document.querySelectorAll('[data-landing-bg]').length === 1))
  const gapClip = { x: 2, y: 150, width: 60, height: 60 }
  const gapWithBg = await page.screenshot({ clip: gapClip })
  await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    if (el instanceof HTMLElement) el.style.visibility = 'hidden'
  })
  const gapWithoutBg = await page.screenshot({ clip: gapClip })
  await page.evaluate(() => {
    const el = document.querySelector('[data-landing-bg]')
    if (el instanceof HTMLElement) el.style.visibility = ''
  })
  check('landing: backdrop visibly renders (not hidden behind base)', !gapWithBg.equals(gapWithoutBg))
  check('content: category heading sits on white surface', (await opaqueAncestorBg('#home-categories-heading')) === 'rgb(255, 255, 255)')
  check('content: favourites heading sits on white surface', (await opaqueAncestorBg('#favourites-heading')) === 'rgb(255, 255, 255)')
  check('content: category card text sits on white surface', (await opaqueAncestorBg('section[aria-labelledby="home-categories-heading"] a[aria-label^="Shop "]')) === 'rgb(255, 255, 255)')
  check('content: product card text sits on white surface', (await opaqueAncestorBg('section[aria-labelledby="favourites-heading"] h3 a')) === 'rgb(255, 255, 255)')
  check('ad strip: distinct opaque highlighted surface', await page.evaluate(() => {
    const el = document.querySelector('[data-service-strip]')
    if (!el) return false
    const cs = getComputedStyle(el)
    return cs.backgroundColor === 'rgb(23, 63, 40)' && cs.backgroundImage === 'none'
  }))

  // --- Announcement strip: single-line ticker on mobile ---
  await page.setViewportSize({ width: 380, height: 800 })
  await page.waitForTimeout(300)
  check('strip mobile: marquee is a single line', await page.evaluate(() => {
    const viewport = document.querySelector('[data-strip-viewport]')
    if (!viewport) return false
    return (
      viewport.scrollHeight <= viewport.clientHeight + 1 &&
      viewport.getBoundingClientRect().height > 0 &&
      viewport.getBoundingClientRect().height < 52
    )
  }))
  check('strip mobile: track is wider than viewport (it scrolls)', await page.evaluate(() => {
    const track = document.querySelector('[data-strip-track]')
    const viewport = document.querySelector('[data-strip-viewport]')
    return !!track && !!viewport && track.scrollWidth > viewport.clientWidth
  }))
  check('strip mobile: items duplicated for seamless loop', await page.evaluate(() => {
    return document.querySelectorAll('[data-strip-mobile] [data-marquee-item]').length === 6
  }))
  check('strip mobile: static desktop row hidden', await page.evaluate(() => {
    const desktop = document.querySelector('[data-strip-desktop]')
    return !!desktop && getComputedStyle(desktop).display === 'none'
  }))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.waitForTimeout(300)
  check('strip desktop: marquee hidden, static row shown', await page.evaluate(() => {
    const mobile = document.querySelector('[data-strip-mobile]')
    const desktop = document.querySelector('[data-strip-desktop]')
    return (
      !!mobile &&
      !!desktop &&
      getComputedStyle(mobile).display === 'none' &&
      getComputedStyle(desktop).display !== 'none'
    )
  }))
  check('landing: sunset image asset loads', (await (await context.request.get(BASE + '/images/skimart-sunset-background.png')).status()) === 200)
  check('hero: headline and CTA readable', await page.getByRole('heading', { level: 1 }).first().isVisible())
  await shot(page, 'hero-promo')

  // --- Checkout flow: Cash on Delivery ---
  await page.evaluate(() => window.localStorage.removeItem('skimart.cart.v1'))
  await page.goto(BASE + '/product/amul-taaza-toned-milk-500ml', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Add Amul Taaza Toned Milk to cart/i }).click()
  await page.waitForTimeout(300)

  await page.goto(BASE + '/cart', { waitUntil: 'networkidle' })
  check('cart page title', await page.getByRole('heading', { name: 'Your shopping cart' }).isVisible())
  check('cart line item present', await page.getByText('Amul Taaza Toned Milk').first().isVisible())
  check('cart total includes delivery fee', await page.getByText('₹57', { exact: true }).first().isVisible())
  await page.getByRole('group', { name: /Quantity of Amul/i }).getByRole('button', { name: /Increase/i }).click()
  await page.waitForTimeout(200)
  check('cart subtotal recalculates', await page.getByText('₹54', { exact: true }).first().isVisible())
  check('cart total recalculates', await page.getByText('₹84', { exact: true }).first().isVisible())
  await shot(page, 'cart')

  await page.setViewportSize({ width: 380, height: 800 })
  await page.waitForTimeout(200)
  check('no horizontal overflow (cart mobile)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.setViewportSize({ width: 1440, height: 900 })

  await page.getByRole('link', { name: /Proceed to checkout/i }).click()
  await page.waitForURL(/\/checkout/)
  await page.waitForTimeout(250)
  check('checkout page', await page.getByRole('heading', { level: 1, name: 'Checkout' }).isVisible())

  await page.setViewportSize({ width: 380, height: 800 })
  await page.waitForTimeout(200)
  check('no horizontal overflow (checkout mobile)', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.setViewportSize({ width: 1440, height: 900 })

  await page.getByRole('button', { name: 'Place order' }).click()
  await page.waitForTimeout(200)
  check('checkout validates full name', await page.getByText(/Please enter your full name/i).isVisible())
  await page.getByLabel('Full name').fill('Demo Customer')
  await page.getByLabel('Mobile number').fill('1234567890')
  await page.getByLabel('House / flat number').fill('12, Main Road')
  await page.getByLabel('Street / locality').fill('Pratap Nagar')
  await page.getByLabel('PIN code').fill('12')
  await page.getByRole('button', { name: 'Place order' }).click()
  await page.waitForTimeout(200)
  check('checkout validates mobile', await page.getByText(/valid 10-digit Indian mobile/i).isVisible())
  check('checkout validates pin', await page.getByText(/6 digits/i).isVisible())

  await page.getByLabel('Mobile number').fill('9876543210')
  await page.getByLabel('PIN code').fill('177203')
  await page.getByLabel(/Cash on Delivery/i).check()
  await page.getByRole('button', { name: 'Place order' }).click()
  await page.waitForURL(/\/order-confirmation\/SKM-/)
  await page.waitForTimeout(300)
  check('order confirmation heading', await page.getByRole('heading', { name: /Your order has been placed/i }).isVisible())
  check('order confirmation demo label', await page.getByText(/Demonstration order/i).first().isVisible())
  const codOrderId = page.url().split('/').pop()
  check('cart cleared after order', (await page.locator('button[aria-label^="Open cart"] span[aria-hidden="true"]').count()) === 0)
  await shot(page, 'order-confirmation')

  await page.goto(BASE + '/order-confirmation/' + codOrderId, { waitUntil: 'networkidle' })
  check('confirmation survives reload', await page.getByText(codOrderId).first().isVisible())

  await page.goto(BASE + '/order-confirmation/SKM-00000000-ZZZZ', { waitUntil: 'networkidle' })
  check('invalid order id shows error', await page.getByText(/Order not found/i).isVisible())

  await page.goto(BASE + '/orders', { waitUntil: 'networkidle' })
  check('order history lists order', await page.getByText(codOrderId).first().isVisible())
  await page.getByText(codOrderId).first().click()
  await page.waitForURL(/\/orders\/SKM-/)
  await page.waitForTimeout(250)
  check('order details page', await page.getByRole('heading', { name: codOrderId }).isVisible())

  await page.goto(BASE + '/checkout', { waitUntil: 'networkidle' })
  check('empty-cart checkout prevented', await page.getByText('Your cart is empty').isVisible())

  // --- Checkout flow: simulated online payment ---
  await page.goto(BASE + '/product/aashirvaad-atta-5kg', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Add Aashirvaad Atta to cart/i }).click()
  await page.waitForTimeout(300)
  await page.goto(BASE + '/checkout', { waitUntil: 'networkidle' })
  await fillDeliveryForm(page)
  await page.getByLabel(/Online Payment Simulation/i).check()

  await page.getByRole('button', { name: /Simulate payment/i }).click()
  check('payment modal opens', await page.getByRole('dialog', { name: 'Demo payment' }).isVisible())
  await page.getByRole('button', { name: 'Cancel' }).click()
  await page.waitForTimeout(200)
  check('payment cancel retains form', (await page.getByLabel('Full name').inputValue()) === 'Demo Customer')

  await page.getByRole('button', { name: /Simulate payment/i }).click()
  await page.getByRole('button', { name: /Simulate failed payment/i }).click()
  check('simulated failure shown', await page.getByText(/Payment simulation failed/i).isVisible())
  await page.getByRole('button', { name: /Try again/i }).click()
  await page.getByRole('button', { name: /Simulate successful payment/i }).click()
  check('simulated success shown', await page.getByText(/Payment simulation successful/i).isVisible())
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.waitForTimeout(200)

  const ordersBefore = await page.evaluate(() => JSON.parse(window.localStorage.getItem('skimart.orders.v1') || '[]').length)
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) => /Place order/.test(b.textContent || ''))
    if (btn) {
      btn.click()
      btn.click()
    }
  })
  await page.waitForURL(/\/order-confirmation\/SKM-/)
  await page.waitForTimeout(300)
  const ordersAfter = await page.evaluate(() => JSON.parse(window.localStorage.getItem('skimart.orders.v1') || '[]').length)
  check('duplicate place-order prevented', ordersAfter - ordersBefore === 1)
  check('online order confirmation', await page.getByRole('heading', { name: /Your order has been placed/i }).isVisible())

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