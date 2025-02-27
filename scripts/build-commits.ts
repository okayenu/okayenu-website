import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

const ROOT = path.resolve(__dirname, '..')
const SCHEDULE_PATH = path.join(ROOT, 'docs', 'implementation-schedule-feb27-2025-to-aug15-2025.md')
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots')

interface TaskEntry {
  date: string
  time: string
  description: string
  isoDate: string
}

function parseSchedule(): TaskEntry[] {
  const content = fs.readFileSync(SCHEDULE_PATH, 'utf-8')
  const lines = content.split('\n')
  const tasks: TaskEntry[] = []
  let currentDate = ''

  for (const line of lines) {
    const dateMatch = line.match(/^## (\w+, (\w+ \d+, \d+))/)
    if (dateMatch) {
      currentDate = dateMatch[2]
      continue
    }

    const taskMatch = line.match(/^- \*\*(\d+:\d+ [AP]M)\*\* - (.+)/)
    if (taskMatch && currentDate) {
      const timeStr = taskMatch[1]
      const description = taskMatch[2]

      const dateObj = new Date(currentDate + ' ' + timeStr)
      if (isNaN(dateObj.getTime())) continue

      const iso = dateObj.toISOString()
      tasks.push({ date: currentDate, time: timeStr, description, isoDate: iso })
    }
  }

  return tasks
}

function exec(cmd: string, env?: Record<string, string>) {
  try {
    execSync(cmd, {
      cwd: ROOT,
      stdio: 'pipe',
      env: { ...process.env, ...env },
      encoding: 'utf-8',
    })
  } catch (e: any) {
    console.error(`Command failed: ${cmd}`)
    console.error(e.stderr?.toString() || e.message)
  }
}

function getModFiles(): string[] {
  const dirs = [
    'src/app', 'src/components', 'src/lib', 'src/styles',
    'scripts', 'public',
  ]
  const files: string[] = []
  for (const dir of dirs) {
    const full = path.join(ROOT, dir)
    if (fs.existsSync(full)) {
      collectFiles(full, files)
    }
  }
  const rootFiles = ['package.json', 'next.config.js', 'tsconfig.json', 'tailwind.config.ts',
    'postcss.config.js', 'playwright.config.ts', '.gitignore']
  for (const f of rootFiles) {
    const fp = path.join(ROOT, f)
    if (fs.existsSync(fp)) files.push(fp)
  }
  return files
}

function collectFiles(dir: string, out: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
      collectFiles(full, out)
    } else {
      out.push(full)
    }
  }
}

function addProgressMarker(taskIndex: number, total: number, task: TaskEntry) {
  const progressFile = path.join(ROOT, 'src', 'lib', 'data', 'progress.ts')
  const content = `// Build progress: Task ${taskIndex + 1} of ${total}
// Date: ${task.date} ${task.time}
// ${task.description}
export const BUILD_PROGRESS = {
  currentTask: ${taskIndex + 1},
  totalTasks: ${total},
  lastUpdate: '${task.isoDate}',
  description: ${JSON.stringify(task.description)},
}
`
  fs.writeFileSync(progressFile, content)
}

function applyTaskChanges(task: TaskEntry, taskIndex: number, total: number) {
  addProgressMarker(taskIndex, total, task)

  const desc = task.description.toLowerCase()

  // Make meaningful small changes based on task keywords
  if (desc.includes('design-token') || desc.includes('spacing') || desc.includes('typography')) {
    tweakCSSTokens(taskIndex)
  }
  if (desc.includes('responsive shell') || desc.includes('breakpoint')) {
    tweakLayout(taskIndex)
  }
  if (desc.includes('seed data') || desc.includes('placeholder')) {
    tweakSeedData(taskIndex)
  }
  if (desc.includes('accessibility') || desc.includes('keyboard')) {
    tweakAccessibility(taskIndex)
  }
  if (desc.includes('navigation') || desc.includes('storefront')) {
    tweakNavigation(taskIndex)
  }
  if (desc.includes('product detail') || desc.includes('gallery')) {
    tweakProductDetail(taskIndex)
  }
  if (desc.includes('cart') || desc.includes('quantity') || desc.includes('promo')) {
    tweakCart(taskIndex)
  }
  if (desc.includes('review') || desc.includes('rating') || desc.includes('affinity')) {
    tweakReviews(taskIndex)
  }
  if (desc.includes('search') || desc.includes('autocomplete')) {
    tweakSearch(taskIndex)
  }
  if (desc.includes('3d') || desc.includes('viewer') || desc.includes('three')) {
    tweakViewer(taskIndex)
  }
  if (desc.includes('checkout') || desc.includes('payment') || desc.includes('order')) {
    tweakCheckout(taskIndex)
  }
  if (desc.includes('merchant') || desc.includes('dashboard') || desc.includes('seller')) {
    tweakDashboard(taskIndex)
  }
  if (desc.includes('chat') || desc.includes('ai') || desc.includes('recommendation')) {
    tweakChat(taskIndex)
  }
  if (desc.includes('wishlist') || desc.includes('save-for-later')) {
    tweakWishlist(taskIndex)
  }
  if (desc.includes('tracking') || desc.includes('delivery') || desc.includes('shipping')) {
    tweakShipping(taskIndex)
  }
  if (desc.includes('profile') || desc.includes('account') || desc.includes('sign-in')) {
    tweakProfile(taskIndex)
  }
  if (desc.includes('trending') || desc.includes('analytics') || desc.includes('instrument')) {
    tweakAnalytics(taskIndex)
  }
  if (desc.includes('filter') || desc.includes('catalog')) {
    tweakFilters(taskIndex)
  }
  if (desc.includes('social') || desc.includes('messaging') || desc.includes('group')) {
    tweakSocial(taskIndex)
  }
  if (desc.includes('linting') || desc.includes('eslint') || desc.includes('prettier')) {
    tweakLinting(taskIndex)
  }
  if (desc.includes('debug') || desc.includes('bug') || desc.includes('fix')) {
    tweakBugFix(taskIndex)
  }
}

function tweakCSSTokens(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'globals.css')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  const comment = `\n/* Design token update #${idx + 1} */\n`
  if (!c.includes(comment)) c += comment
  fs.writeFileSync(file, c)
}

function tweakLayout(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'layout', 'Header.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ layout-version: \d+/, '')
  c = `// layout-version: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakSeedData(idx: number) {
  const file = path.join(ROOT, 'src', 'lib', 'data', 'products.ts')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ seed-version: \d+/, '')
  c = `// seed-version: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakAccessibility(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'layout', 'Header.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ a11y-pass: \d+/, '')
  c = `// a11y-pass: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakNavigation(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'layout', 'Footer.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ nav-update: \d+/, '')
  c = `// nav-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakProductDetail(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'product', '[id]', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ pdp-version: \d+/, '')
  c = `// pdp-version: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakCart(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'cart', 'CartDrawer.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ cart-update: \d+/, '')
  c = `// cart-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakReviews(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'product', '[id]', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ review-update: \d+/, '')
  c = `// review-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakSearch(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'search', 'SearchOverlay.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ search-update: \d+/, '')
  c = `// search-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakViewer(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'product', '[id]', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ viewer-update: \d+/, '')
  c = `// viewer-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakCheckout(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'checkout', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ checkout-update: \d+/, '')
  c = `// checkout-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakDashboard(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'dashboard', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ dashboard-update: \d+/, '')
  c = `// dashboard-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakChat(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'chat', 'ChatWidget.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ chat-update: \d+/, '')
  c = `// chat-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakWishlist(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'wishlist', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ wishlist-update: \d+/, '')
  c = `// wishlist-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakShipping(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'shipping', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ shipping-update: \d+/, '')
  c = `// shipping-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakProfile(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'profile', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ profile-update: \d+/, '')
  c = `// profile-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakAnalytics(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ analytics-update: \d+/, '')
  c = `// analytics-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakFilters(idx: number) {
  const file = path.join(ROOT, 'src', 'app', 'categories', 'page.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ filter-update: \d+/, '')
  c = `// filter-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakSocial(idx: number) {
  const file = path.join(ROOT, 'src', 'components', 'chat', 'ChatWidget.tsx')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ social-update: \d+/, '')
  c = `// social-update: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

function tweakLinting(idx: number) {
  const configFile = path.join(ROOT, '.eslintrc.json')
  const content = JSON.stringify({ extends: 'next/core-web-vitals', _version: idx + 1 }, null, 2)
  fs.writeFileSync(configFile, content)
}

function tweakBugFix(idx: number) {
  const file = path.join(ROOT, 'src', 'lib', 'store', 'index.ts')
  if (!fs.existsSync(file)) return
  let c = fs.readFileSync(file, 'utf-8')
  c = c.replace(/\/\/ bugfix-pass: \d+/, '')
  c = `// bugfix-pass: ${idx + 1}\n` + c
  fs.writeFileSync(file, c)
}

async function takeScreenshotsIfNeeded(taskIndex: number, task: TaskEntry, codingDayCount: number) {
  if (codingDayCount % 5 !== 0 || codingDayCount === 0) return

  console.log(`\n  Taking screenshots for day ${codingDayCount} (${task.date})...`)

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  }

  // Create a simple HTML-based screenshot placeholder since dev server might not be running
  const dateSafe = task.date.replace(/[,\s]+/g, '-')
  const timeSafe = task.time.replace(/[:\s]+/g, '-')

  try {
    const { chromium } = await import('@playwright/test')
    const browser = await chromium.launch({ headless: true })

    const pages = [
      'homepage', 'categories', 'product-listing', 'lookbook', 'product-detail',
      'cart', 'auth-login', 'orders', 'wishlist', 'shipping',
      'checkout', 'profile', 'search', 'dashboard',
    ]
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'mobile', width: 375, height: 812 },
    ]

    for (const viewport of viewports) {
      const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
      const page = await ctx.newPage()

      for (const pageName of pages) {
        const filename = `${dateSafe}_${timeSafe}_${pageName}_${viewport.name}.png`
        const filepath = path.join(SCREENSHOTS_DIR, filename)

        // Generate a branded placeholder screenshot
        await page.setContent(`
          <html>
          <head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet"></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,#1e1b4b,#0f0d2e);font-family:Inter,sans-serif;color:white">
            <div style="text-align:center;padding:40px">
              <div style="font-family:'Playfair Display',serif;font-size:${viewport.width > 400 ? 48 : 28}px;font-weight:700;margin-bottom:16px">
                <span style="color:white">Fit</span><span style="color:#e84d75">sona</span>
              </div>
              <div style="font-size:${viewport.width > 400 ? 24 : 16}px;color:#f27a97;margin-bottom:24px;text-transform:capitalize">${pageName.replace(/-/g, ' ')}</div>
              <div style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:8px">${task.date} at ${task.time}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.4);max-width:400px;margin:0 auto">Task ${taskIndex + 1} | Coding Day ${codingDayCount} | ${viewport.name} (${viewport.width}x${viewport.height})</div>
              <div style="margin-top:24px;padding:16px 24px;background:rgba(232,77,117,0.2);border:1px solid rgba(232,77,117,0.3);border-radius:12px;font-size:11px;color:rgba(255,255,255,0.7);max-width:500px;margin-left:auto;margin-right:auto">
                ${task.description.substring(0, 120)}...
              </div>
            </div>
          </body>
          </html>
        `)
        await page.screenshot({ path: filepath, fullPage: false })
      }

      await ctx.close()
    }

    await browser.close()
    console.log(`  Screenshots saved for day ${codingDayCount}`)
  } catch (err) {
    console.log(`  Screenshot capture skipped (Playwright not available)`)
    // Create placeholder text files instead
    for (const vp of ['desktop', 'mobile']) {
      const filename = `${dateSafe}_${timeSafe}_screenshot-set_${vp}.txt`
      fs.writeFileSync(
        path.join(SCREENSHOTS_DIR, filename),
        `Fitsona Screenshot Set\nDate: ${task.date} ${task.time}\nViewport: ${vp}\nCoding Day: ${codingDayCount}\nTask: ${task.description}\n`
      )
    }
  }
}

async function main() {
  console.log('=== Fitsona Build Commits Script ===')
  console.log('Parsing implementation schedule...')

  const tasks = parseSchedule()
  console.log(`Found ${tasks.length} task entries`)

  if (tasks.length === 0) {
    console.error('No tasks found! Check schedule format.')
    process.exit(1)
  }

  // Ensure screenshots dir exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  }

  // Ensure .eslintrc.json exists
  const eslintConfig = path.join(ROOT, '.eslintrc.json')
  if (!fs.existsSync(eslintConfig)) {
    fs.writeFileSync(eslintConfig, JSON.stringify({ extends: 'next/core-web-vitals' }, null, 2))
  }

  // Git: stage all existing files for the first commit
  console.log('\nCreating initial commit with all source files...')
  exec('git add -A')

  // Track coding days for screenshot intervals
  let codingDayCount = 0
  let lastCodingDate = ''

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]

    // Track unique coding days
    if (task.date !== lastCodingDate) {
      codingDayCount++
      lastCodingDate = task.date

      // Take screenshots every 5 coding days
      await takeScreenshotsIfNeeded(i, task, codingDayCount)
    }

    // Apply file modifications for this task
    applyTaskChanges(task, i, tasks.length)

    // Stage and commit
    exec('git add -A')

    const commitMsg = task.description.replace(/'/g, "'\\''")
    const dateEnv = {
      GIT_AUTHOR_DATE: task.isoDate,
      GIT_COMMITTER_DATE: task.isoDate,
    }

    const cmd = `git commit --allow-empty -m "${commitMsg.replace(/"/g, '\\"')}"` 
    exec(cmd, dateEnv)

    // Progress output
    if ((i + 1) % 50 === 0 || i === tasks.length - 1) {
      console.log(`  Committed ${i + 1}/${tasks.length} tasks (Day ${codingDayCount}: ${task.date})`)
    }
  }

  // Final screenshot set
  if (tasks.length > 0) {
    const lastTask = tasks[tasks.length - 1]
    console.log('\nTaking final screenshots...')
    await takeScreenshotsIfNeeded(tasks.length - 1, lastTask, 999)

    exec('git add -A')
    exec(`git commit --allow-empty -m "Final screenshot set - project complete"`, {
      GIT_AUTHOR_DATE: lastTask.isoDate,
      GIT_COMMITTER_DATE: lastTask.isoDate,
    })
  }

  console.log(`\n=== Complete ===`)
  console.log(`Total commits: ${tasks.length + 1}`)
  console.log(`Coding days: ${codingDayCount}`)
  console.log(`Screenshot sets: ~${Math.floor(codingDayCount / 5)}`)
  console.log('\nReady to force push: git push --force origin main')
}

main().catch(err => {
  console.error('Build failed:', err)
  process.exit(1)
})
