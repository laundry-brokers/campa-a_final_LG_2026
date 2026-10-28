import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const csp = {
  name: 'inject-csp', apply: 'build',
  transformIndexHtml: () => [{
    tag: 'meta',
    attrs: { 'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
    injectTo: 'head-prepend'
  }]
}
export default defineConfig({ plugins: [vue(), csp], base: './', build: { assetsInlineLimit: 0 } })
