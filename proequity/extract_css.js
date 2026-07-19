const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'ProEquity_Terminal.html');
const cssPath = path.join(__dirname, 'client', 'src', 'index.css');

try {
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract CSS
  const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
  if (styleMatch && styleMatch[1]) {
    fs.writeFileSync(cssPath, styleMatch[1].trim());
    console.log('CSS extracted successfully.');
  } else {
    console.error('No <style> tag found in HTML.');
  }
} catch (err) {
  console.error('Error:', err.message);
}
