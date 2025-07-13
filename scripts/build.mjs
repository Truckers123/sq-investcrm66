import { build } from 'esbuild'
import { stylePlugin } from 'esbuild-style-plugin'
import { rimraf } from 'rimraf'
import { readFileSync } from 'fs'

const isProduction = process.argv.includes('--production')

// Clean dist directory
await rimraf('dist')

// Read package.json for dependencies
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))

await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  minify: isProduction,
  sourcemap: !isProduction,
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    })
  ],
  external: [],
  loader: {
    '.tsx': 'tsx',
    '.ts': 'tsx',
    '.jsx': 'jsx',
    '.js': 'jsx'
  }
})

// Copy HTML file
import { copyFileSync } from 'fs'
copyFileSync('index.html', 'dist/index.html')

console.log('Build completed successfully!')
