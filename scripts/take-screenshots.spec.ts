import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Category', url: '/categories' },
  { name: 'PLP', url: '/products' },
  { name: 'Lookbook', url: '/lookbook' },
  { name: 'PDP', url: '/product/1' },
  { name: 'Cart', url: '/cart' },
  { name: 'Shuffle', url: '/shuffle' },
  { name: 'Login', url: '/auth' },
  { name: 'OrderHistory', url: '/orders' },
  { name: 'Wishlist', url: '/wishlist' },
  { name: 'Shipping', url: '/shipping' },
];

const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Mobile', width: 375, height: 812 },
];

const screenshotsDir = path.join(process.cwd(), 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Generate date formatting matching the prompt's requirement
const getFormattedDate = () => {
  if (process.env.RUN_ID) return process.env.RUN_ID;
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
};

const timestampText = () => {
  if (process.env.TASK_DATE) return process.env.TASK_DATE;
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

test.describe.serial('Fitsona Implementation Screenshots', () => {
  const runId = getFormattedDate();

  for (const viewport of viewports) {
    test(`Capture all screens on ${viewport.name}`, async ({ page }) => {
      test.setTimeout(400000); // 6+ mins per viewport
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Navigate to homepage first to set up localStorage
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Inject mock state
      await page.evaluate(() => {
        const date = new Date().toISOString();
        const mockProduct = {
          id: "prod-0001", name: "Fitsona Originals Hoodie", brand: "Fitsona Originals", 
          price: 59.99, description: "Great hoodie.", category: "Hoodies", 
          images: ["/assets/images/placeholder.jpg"],
          model3dUrl: "/assets/models/3d_hoodie.glb",
          colors: [{name: "Black", hex: "#000", available: true}], 
          sizes: [{label: "M", value: "m", available: true}], 
          rating: 4.5, reviewCount: 120, tags: [], inStock: true, fitType: "regular", 
          gender: "unisex", material: "Cotton", careInstructions: [], createdAt: date
        };
        
        localStorage.setItem('fitsona-cart', JSON.stringify({
          state: {
            items: [
              { productId: "prod-0001", product: mockProduct, quantity: 2, selectedSize: "m", selectedColor: "Black", addedAt: date }
            ],
            isOpen: false
          },
          version: 0
        }));
        
        localStorage.setItem('fitsona-wishlist', JSON.stringify({
          state: { items: [{ productId: "prod-0001", product: mockProduct, addedAt: date }] },
          version: 0
        }));

        localStorage.setItem('fitsona-auth', JSON.stringify({
          state: {
            user: { id: "u-1", email: "test@example.com", firstName: "Jane", lastName: "Doe", preferences: {}, addresses: [], paymentMethods: [], createdAt: date },
            isAuthenticated: true,
            isLoading: false
          },
          version: 0
        }));
      });

      // Reload to apply state
      await page.reload({ waitUntil: 'networkidle' });

      for (const pageInfo of pages) {
        console.log(`Navigating to ${pageInfo.name} on ${viewport.name}`);
        const response = await page.goto(pageInfo.url, { waitUntil: 'domcontentloaded' });
        
        if (response && !response.ok()) {
            console.log(`Warning: ${pageInfo.name} returned status ${response.status()}`);
        }
        
        // Wait for WebGL Canvases and large .glb files to download and render
        await page.waitForTimeout(5000);

        if (pageInfo.name === 'Shuffle') {
          try {
            await page.fill('input[type="text"]', 'Underground artist editorial');
            await page.click('button:has-text("Compile")');
            await page.waitForTimeout(2000); // Wait for mock AI search to finish
          } catch (e) {
            console.log('Could not simulate AI shuffle');
          }
        }

        await page.evaluate((timeText) => {
          // Remove existing banners if any
          document.querySelectorAll('.screenshot-banner').forEach(el => el.remove());
          
          const banner = document.createElement('div');
          banner.className = 'screenshot-banner';
          banner.style.position = 'fixed';
          banner.style.bottom = '10px';
          banner.style.right = '10px';
          banner.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          banner.style.color = '#ffffff';
          banner.style.padding = '8px 16px';
          banner.style.borderRadius = '4px';
          banner.style.fontFamily = 'monospace';
          banner.style.fontSize = '14px';
          banner.style.zIndex = '999999';
          banner.style.pointerEvents = 'none';
          banner.innerText = `Fitsona Build | ${timeText}`;
          document.body.appendChild(banner);
        }, timestampText());

        await page.waitForTimeout(500);

        const fileName = `${runId}-${pageInfo.name}-${viewport.name}.png`;
        const filePath = path.join(screenshotsDir, fileName);

        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Saved screenshot: ${fileName}`);
      }
    });
  }
});
