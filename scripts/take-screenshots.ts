import { chromium, Browser, Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'categories', path: '/categories' },
  { name: 'product-listing', path: '/products' },
  { name: 'lookbook', path: '/lookbook' },
  { name: 'product-detail', path: '/product/prod-0001' },
  { name: 'cart', path: '/cart' },
  { name: 'auth-login', path: '/auth' },
  { name: 'orders', path: '/orders' },
  { name: 'wishlist', path: '/wishlist' },
  { name: 'shipping', path: '/shipping' },
  { name: 'checkout', path: '/checkout' },
  { name: 'profile', path: '/profile' },
  { name: 'search', path: '/search?q=hoodie' },
  { name: 'dashboard', path: '/dashboard' },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'mobile', width: 375, height: 812 },
]

export async function takeScreenshots(dateStamp: string, timeStamp: string) {
  const screenshotDir = path.resolve(__dirname, '..', 'screenshots')
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }

  const browser = await chromium.launch({ headless: true })
  const dateSafe = dateStamp.replace(/\//g, '-')
  const timeSafe = timeStamp.replace(/:/g, '-')

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    })
    const page = await context.newPage()

    for (const p of PAGES) {
      try {
        await page.goto(`http://localhost:3000${p.path}`, {
          waitUntil: 'networkidle',
          timeout: 15000,
        })
        await page.waitForTimeout(1000)

        const filename = `${dateSafe}_${timeSafe}_${p.name}_${viewport.name}.png`
        await page.screenshot({
          path: path.join(screenshotDir, filename),
          fullPage: true,
        })
        console.log(`  Captured: ${filename}`)
      } catch (err) {
        console.log(`  Skipped ${p.name} (${viewport.name}): page not ready`)
      }
    }

    await context.close()
  }

  await browser.close()
  console.log(`Screenshots saved to ${screenshotDir}`)
}

if (require.main === module) {
  const date = process.argv[2] || new Date().toLocaleDateString('en-US')
  const time = process.argv[3] || new Date().toLocaleTimeString('en-US', { hour12: false })
  takeScreenshots(date, time).catch(console.error)
}
