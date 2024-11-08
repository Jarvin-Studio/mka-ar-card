import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(),
    react()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ],
    }
  }
})
