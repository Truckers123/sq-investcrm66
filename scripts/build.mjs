import { build } from 'esbuild'
import pkg from 'esbuild-style-plugin'
const { stylePlugin } = pkg

const isProduction = process.argv.includes('--production')

const config = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  jsxImportSource: 'react',
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    }),
  ],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file',
  },
  minify: isProduction,
  sourcemap: !isProduction,
  external: [],
}

if (!isProduction) {
  config.watch = {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  }
}

build(config).catch(() => process.exit(1))
