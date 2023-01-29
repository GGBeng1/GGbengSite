import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import lit from '@astrojs/lit';
import image from '@astrojs/image';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.ggbeng.tech/',
	// outDir: './docs',
	// base: '',
	// Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
	sitemap: true,
	// Generate sitemap (set to "false" to disable)
	integrations: [
		sitemap(),
		mdx({
			extendMarkdownConfig: false,
			smartypants: true,
			gfm: true,
		}),
		lit(),
		image(),
		NetlifyCMS({
			config: {
				// Use Netlify’s “Git Gateway” authentication and target our default branch
				backend: {
					name: 'git-gateway',
					branch: 'main',
				},
				// Configure where our media assets are stored & served from
				media_folder: 'public/assets/images/blog',
				public_folder: '/assets/images/blog',
				// Configure the content collections
				collections: [
					{
						name: 'posts',
						label: 'Blog Posts',
						label_singular: 'Blog Post',
						folder: 'src/pages/blog/posts',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Post Title' },
              {
                name: 'publishDate',
                widget: 'datetime',
                format: 'YYYY/MM/DD',
                date_format: 'YYYY/MM/DD',
                time_format: false,
                label: 'Publish Date',
              },
							{
								name: 'description',
								widget: 'string',
								label: 'Description',
								required: false,
							},
							{
								label: 'featuredImage',
								name: 'thumbnail',
								widget: 'image',
								required: false,
							},
							{ name: 'body', widget: 'markdown', label: 'Post Body' },
							{
								label: 'Layout',
								name: 'layout',
								widget: 'select',
								default: '../../layouts/Post.astro',
								options: [
									{ label: 'Blog Post', value: '../../layouts/Post.astro' },
								],
							},
						],
					},
				],
			},
		}),
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
