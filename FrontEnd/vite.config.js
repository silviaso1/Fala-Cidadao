import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      {
        name: 'html-transform-google-maps',
        transformIndexHtml(html) {
          const apiKey = env.VITE_GOOGLE_MAPS_API_KEY;
          const scriptTag = `
  <script
    src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly&solution_channel=GMP_WebComponents"
    defer>
  </script>
`;

          return html.replace(/<\/head>/, `${scriptTag}</head>`);
        },
      },
    ],
  });
};
