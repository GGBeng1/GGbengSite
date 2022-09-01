import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.ggbeng.tech',
	// outDir: './docs',
	// base: '',
	// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
	sitemap: true,
	// Generate sitemap (set to "false" to disable)
	integrations: [
		sitemap(),
		mdx(),
		vue(),
	], // Add renderers to the config
	vite: {
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:8888',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
	},
});
