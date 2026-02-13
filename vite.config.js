import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to handle .md?raw imports
const rawMarkdownPlugin = () => ({
  name: 'raw-markdown',
  resolveId(id) {
    if (id.includes('.md?raw')) {
      return id
    }
  },
  load(id) {
    if (id.includes('.md?raw')) {
      const mdPath = id.replace('?raw', '')
      const content = fs.readFileSync(path.resolve(mdPath), 'utf-8')
      return `export default ${JSON.stringify(content)}`
    }
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [rawMarkdownPlugin(), react()],
})
