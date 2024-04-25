import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginString from 'vite-plugin-string';

// Importa Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineConfig({
  plugins: [reactRefresh(), vitePluginString()],
  resolve: {
    alias: {
      // Define un alias para Bootstrap en caso de que sea necesario
      'bootstrap-css': 'bootstrap/dist/css/bootstrap.min.css',
    },
  },
});

