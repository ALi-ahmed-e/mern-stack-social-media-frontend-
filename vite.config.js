import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,

    proxy: {
      '/api': {
        target: 'https://smws.onrender.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
    // proxy:{
    //   "/api": {
    //   target: "https://smws.onrender.com",
    //   changeOrigin: true,
    //   secure: false,

    //   rewrite:(path)=>path.replace(/^\/api/, ''),
    // }}
  
})
