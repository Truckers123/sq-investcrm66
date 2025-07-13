import { build } from 'esbuild';
import pkg from 'esbuild-style-plugin';
const { stylePlugin } = pkg;
import { rimraf } from 'rimraf';
import fs from 'fs';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const isProduction = process.argv.includes('--production');

console.log(`🔨 Building in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode...`);

// Clean dist directory
try {
  await rimraf('dist');
  console.log('✅ Cleaned dist directory');
} catch (error) {
  console.log('⚠️ No dist directory to clean');
}

// Ensure dist directory exists
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('dist/assets', { recursive: true });

try {
  // Build the application
  await build({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    minify: isProduction,
    sourcemap: !isProduction,
    target: ['es2020'],
    outfile: 'dist/assets/main.js',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    },
    plugins: [
      stylePlugin({
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
          ],
        },
      }),
    ],
    loader: {
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.svg': 'dataurl',
      '.gif': 'dataurl',
      '.woff': 'dataurl',
      '.woff2': 'dataurl',
      '.eot': 'dataurl',
      '.ttf': 'dataurl',
    },
    format: 'iife',
    globalName: 'App',
    jsx: 'automatic',
  });

  console.log('✅ JavaScript build completed');

  // Create index.html
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SQ Invest Limited - CRM Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #f8fafc; }
    #loading {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      display: flex; align-items: center; justify-content: center;
      color: white; z-index: 9999;
    }
    .spinner {
      width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.2);
      border-top: 3px solid white; border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="loading">
    <div>
      <div class="spinner"></div>
      <div style="margin-top: 20px; text-align: center;">
        <div style="font-size: 18px; font-weight: 500;">Loading SQ Invest CRM</div>
        <div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">Preparing demo environment...</div>
      </div>
    </div>
  </div>
  <div id="root"></div>
  <script src="/assets/main.js"></script>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
          loading.style.opacity = '0';
          loading.style.transition = 'opacity 0.5s ease';
          setTimeout(() => loading.remove(), 500);
        }
      }, 1000);
    });
  </script>
</body>
</html>`;

  fs.writeFileSync('dist/index.html', htmlContent);
  fs.writeFileSync('dist/404.html', htmlContent);

  console.log('✅ HTML files created');
  console.log('🚀 Build completed successfully!');
  console.log('📁 Output directory: dist/');

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
