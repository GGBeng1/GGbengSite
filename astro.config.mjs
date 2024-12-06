import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import lit from '@astrojs/lit';
import react from '@astrojs/react';
import commonjs from 'vite-plugin-commonjs'

// https://astro.build/config
export default defineConfig({
	site: 'https://www.ggbeng.today/',
	// outDir: './docs',
	// base: '',
	// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
	sitemap: true,
	server: { port: 8089 },
	// Generate sitemap (set to "false" to disable)
	integrations: [
		sitemap(),
		mdx({
			extendMarkdownConfig: false,
			smartypants: true,
			gfm: true,
		}),
		lit(),
		vue(),
		react(),
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
		plugins: [
			commonjs(
				{
					filter(id) {
						if (id.includes('node_modules/@petercatai/assistant')) {
							console.log('commonjs:', id);
							return true
						}
					}

				}
			),
		]
	},
});
