import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Para GitHub Pages: usa el nombre del repositorio como base
// Ejemplo: si el repo es github.com/usuario/diario-salud → base: '/diario-salud/'
// Para desarrollo local usa '/' (por defecto)
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/diario-salud/' : '/',
})
