import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import preact from '@astrojs/preact';
import vitePreact from '@preact/preset-vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://odyssey-theme.littlesticks.dev/',
	outDir: './docs',
	// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
	sitemap: true,
	// Generate sitemap (set to "false" to disable)
	integrations: [
		sitemap(),
		mdx(),
		vue(),
		preact({
			compat: true,
		}),
	], // Add renderers to the config
});
