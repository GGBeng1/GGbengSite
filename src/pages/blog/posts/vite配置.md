---
layout: '../../../layouts/Post.astro'
title: 开发及生产环境的vite3配置(vue2.7版)
description: vue2.7和vite3组合, 打造完美的vue项目环境
pubDate: 2022/09/01
featuredImage: '/assets/images/blog/vite.png'
tags: ['Vite']
---

## 完整的配置加上注释

- 大家可以根据注释来选择需要的插件

```javascript
import path from 'path';
import { defineConfig } from 'vite';
// 必选 * vite 支持 vue2.7 官方插件
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
// 必选 * 加载 public/index.html
// import html from 'vite-html'
// 可选 - 兼容 CommonJs 写法
import commonjs from 'vite-plugin-commonjs';
// 可选 - 兼容 import('@views/' + path)
import dynamicImport from 'vite-plugin-dynamic-import';
// 可选 - 兼容 webpack 中 require.contex
import viteRequireContext from '@originjs/vite-plugin-require-context';
// 自动引入
import AutoImport from 'unplugin-auto-import/vite';
// svg-loader
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// monaco loader
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
// 查找可用端口
import portfinder from 'portfinder';
// gzip
import viteCompression from 'vite-plugin-compression';
// postcss
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
// 获取webpack的dev配置
import { dev } from './config/index';
import autoImportConfig from './config/autoImportConfig';
const config = {
	publicDir: 'static',
	plugins: [
		monacoEditorPlugin({
			languages: ['javascript', 'typescript', 'json', 'css'],
		}),
		/**
		 * Vite 官方支持 vue2.7 插件
		 */
		vue(),
		vueJsx(),
		/**
		 * 处理 webpack 项目中 require 写法
		 */
		commonjs({
			filter: id => {
				if (String(id).includes('/static/')) {
					return false;
				}
			},
		}),
		/**
		 * 兼容 import('@views/' + path)
		 */
		dynamicImport(),
		/**
		 * 处理 webpack 项目中 require.context 写法
		 */
		viteRequireContext(),
		/**
		 * 将 index.html 重定向到 public/index.html
		 */
		createSvgIconsPlugin({
			// 指定要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/svg-icon')],
			// 执行icon name的格式
			symbolId: 'icon-[name]',
		}),
		AutoImport(autoImportConfig),
	],
	resolve: {
		alias: [
			{ find: '@', replacement: path.join(__dirname, 'src') },
			{
				find: /* ~/ */ /^~(?=\/)/,
				replacement: path.join(__dirname, 'node_modules'),
			},
			{
				find: /* ~ */ /^~(?!\/)/,
				replacement: path.join(__dirname, 'node_modules/'),
			},
		],
		// 同 webpack 中的 extensions
		extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	define: {
		// 同 webpack.DefinePlugin
		'process.env': process.env,
	},
	css: {
		postcss: {
			plugins: [postcssPresetEnv, autoprefixer],
		},
	},
	server: {
		proxy: {},
		port: 8080,
		open: true,
		host: '0.0.0.0',
	},
	build: {
		target: 'es2015', //默认'modules',modules模式Opera、UC、百度浏览器不支持，由于对于移动端，不建议设置modules模式
		assetsInlineLimit: 4096, //默认4096,小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
		cssCodeSplit: true, //默认true, CSS代码拆分
		sourcemap: true,
		minify: 'esbuild', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
	},
};
portfinder.basePort = config.server.port;
const getPort = () => {
	return new Promise((resolve, reject) => {
		portfinder.getPort((err, port) => {
			if (err) {
				reject(err);
			} else {
				// webpack proxy和vite的抹平
				config.server.port = port;
				let proxy = { ...dev.proxyTable };
				let targetProxy = {};
				Object.keys(proxy).forEach(key => {
					let rewriteValue = Object.values(proxy[key].pathRewrite)[0];
					let rewrite = path => path.replace(/^\/api/, rewriteValue || '');
					targetProxy[key] = {
						target: proxy[key].target,
						changeOrigin: proxy[key].changeOrigin,
						rewrite,
					};
				});
				config.server.proxy = targetProxy;
				resolve(true);
			}
		});
	});
};

export default defineConfig(async ({ mode }) => {
	const isProd = mode === 'production';
	await getPort();
	if (isProd) {
		config.plugins.push(
			viteCompression({
				threshold: 10240 * 5,
			}),
		);
		config.build.sourcemap = false;
		config.esbuild = {
			drop: ['console', 'debugger'],
		};
	}
	return config;
});
```
