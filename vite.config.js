import { defineConfig } from 'vite';

const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS);
const base = isGitHubActions ? '/gigabyte-3d/' : '/';

export default defineConfig({
  base,
  plugins: isGitHubActions ? [{
    name: 'github-pages-css-assets',
    transform(code, id) {
      if (id.endsWith('/src/css/styles.css')) {
        return code.replaceAll("url('/images/", `url('${base}images/`);
      }
    }
  }] : []
});
