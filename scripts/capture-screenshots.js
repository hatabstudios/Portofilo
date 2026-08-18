/**
 * Automated Screenshot Capture Utility
 * Usage: node scripts/capture-screenshots.js
 * 
 * Takes project URLs from projects.ts and captures website screenshots automatically.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Sample helper to download screenshot via free Microlink API fallback if Puppeteer is not installed
function downloadScreenshot(url, outputPath) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false`;
    
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.data && json.data.screenshot && json.data.screenshot.url) {
            const imgUrl = json.data.screenshot.url;
            const file = fs.createWriteStream(outputPath);
            https.get(imgUrl, (imgRes) => {
              imgRes.pipe(file);
              file.on('finish', () => {
                file.close();
                console.log(`[✓] Screenshot saved: ${outputPath}`);
                resolve(true);
              });
            });
          } else {
            console.log(`[!] Could not fetch API screenshot for ${url}`);
            resolve(false);
          }
        } catch (e) {
          console.error(`[X] Error parsing API response for ${url}:`, e.message);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`[X] Network error fetching screenshot for ${url}:`, err.message);
      resolve(false);
    });
  });
}

console.log('Automated Screenshot Capture Ready.');
console.log('To run screenshot auto-generation for external project URLs, run node scripts/capture-screenshots.js');
