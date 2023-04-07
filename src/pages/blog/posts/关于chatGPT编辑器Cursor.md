---
layout: '../../../layouts/Post.astro'
title: 关于chatGPT编辑器Cursor引发的Vscode字体样式
description: 关于chatGPT编辑器Cursor引发的Vscode字体样式
publishDate: 2023/04/07
featuredImage: '/assets/images/blog/cursorhead.jpg'
tags: ['Vscode', 'ChatGPT']
---
## Cursor
- Cursor是一个支持ChatGPT4以及githubCopilot的编辑器, 它长下面这个样子
<img src='/assets/images/blog/cursor.jpg' style='margin-bottom: 20px'/>
- 可以使用command + K/L 来使用两个功能
- 当然关于ChatGPT的问题, 我们这里就不讨论了, 成熟的开发都可以自己解决:)

## 问题
- 我们注意到上面的函数的参数是倾斜的, 这点很有意思, 不仅是在括号里是倾斜, 在代码块里也是倾斜的！这很吸引我的注意力, 在早些年开发时的sublime text里, 也有这个功能; 但是在Vscode里, 默认是没有这个配置的需要我们自己设置一下

## 解决
- 首先我们需要`command + shift + p`打开命令面板, 输入`nspectTMScopes`打开设置面板, 我们点击一下. 此时当我们再悬浮到函数的参数上或其他关键字时, 会在右下角显示当前的scope, 这个scope就是表示当前的文字在作用域内类型, 我们可以通过这个scope来设置字体样式
- 下面我把我的设置发布一下, 你可以直接复制到你的settings.json里就可以得到一样的效果了
<img src='/assets/images/blog/vscodefont.jpg' style='margin-bottom: 20px'/>

```json
"editor.tokenColorCustomizations": {
	"textMateRules": [
		{
			"scope": [
				// all comment types
				"comment",
				// true, false, null
				"constant.language",
				// import, from, export, default, return, if, for, break, continue, try, catch, finally,
				// throw, default, yield, await
				"keyword.control",
				// in, void, delete, instanceof
				"keyword.operator.expression",
				// debugger
				"keyword.other",
				// new
				"keyword.operator.new",
				// super, this, arguments
				"variable.language",
				// attributes in html, jsx, etc.
				"entity.other.attribute-name",
				// "storage",
				// function parameters
				"meta.parameters",
				// parameters
				"parameter",
			],
			"settings": {
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				// function keyword does not have an explicit scope without the arrow
				// therefore we explictly exclude the function arrow from being italicized
				"storage.type.function.arrow",
			],
			"settings": {
				"fontStyle": ""
			}
		},
		{
			"scope": [
				// function scope parameters are not italicized
				"entity.other.attribute-name.js",
				"entity.other.attribute-name.ts",
				"entity.other.attribute-name.jsx",
				"entity.other.attribute-name.tsx",
				"variable.parameter",
				"variable.language.super"
			],
			"settings": {
				"fontStyle": "italic"
			}
		},
	]
}
```