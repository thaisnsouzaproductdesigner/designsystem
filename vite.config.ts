import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Este plugin gera os arquivos de tipos (.d.ts) para que quem use a lib tenha autocompletar
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'], // Não queremos tipos das stories no pacote final
    }),
  ],
  build: {
    lib: {
      // O ponto de entrada que criamos
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      // Os nomes dos arquivos finais (ex: designsystem.es.js)
      fileName: (format) => `designsystem.${format}.js`,
      formats: ['es', 'umd'], // ES Modules (Moderno) + UMD (Compatibilidade)
    },
    rollupOptions: {
      // Garante que não vamos empacotar o React junto com a lib (o consumidor deve prover)
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});