import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // <-- This is crucial
  server: {
    host: 'localhost',
    port: 3000,
  },
})






// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/', // <-- This is crucial
//   server: {
//     host: 'localhost',
//     port: 3000,
//   },
// })


