import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendOrigin = env.VITE_API_URL?.replace(/\/api\/?$/, '').replace(/\/+$/, '');

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: backendOrigin
      ? {
          proxy: {
            '/api': backendOrigin,
          },
        }
      : undefined,
  });
}
