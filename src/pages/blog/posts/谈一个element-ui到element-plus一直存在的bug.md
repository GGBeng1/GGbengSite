---
title: 谈一个element-ui到element-plus一直存在的Bug
pubDate: 2024/07/23
description: 谈一个element-ui到element-plus一直存在的Bug
featuredImage: /assets/images/blog/2222.png
tags:
  - vue
  - element-plus
  - element-ui
layout: ../../../layouts/Post.astro
---
# 背景

最近在整理旧项目的bug中，发现这样一个issue: 开启远程搜索的下拉框在选择后，第二次进入页面下拉框里的值为id值即对应label值消失了。。。

## 开始排查

查看代码

```jsx
<el-select
	ref="selectCom"
	v-model="field"
	filterable
	clearable
	remote
	placeholder="请输入关键词"
	:remote-method="remoteMethod" // 远程搜索方法
	@clear="clear"
	@change="change"
	@focus="focus"
>
  ...

  // 获取远程数据
 const remoteMethod = async (str = '') => {
	query.value = str
	await nextTick()
    // 当加载完页面后根据当前的选择的值获取对应的下拉
	queryInterFunc()
}
```

错误展现

![](/assets/images/blog/33.png)

### 明明下拉选项已经回来了为什么没有选中呢？

### 我们先看一下element-ui这块的代码

```jsx
// 已知element-ui中el-select设置选中值的方法是setSelected
// 所以el-select监听value及options进行选中
watch: {
  value(val, oldVal) {
     if (this.multiple) {
       this.resetInputHeight();
       if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
         this.currentPlaceholder = '';
       } else {
         this.currentPlaceholder = this.cachedPlaceHolder;
       }
       if (this.filterable && !this.reserveKeyword) {
         this.query = '';
         this.handleQueryChange(this.query);
       }
     }
    // 值发生变化这里进行选中
     this.setSelected();
     if (this.filterable && !this.multiple) {
       this.inputLength = 20;
     }
     if (!valueEquals(val, oldVal)) {
       this.dispatch('ElFormItem', 'el.form.change', val);
     }
  },
   options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      // 当聚焦时进行选中
      let inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
   }
}
```

### 原因已经清晰

当options通过请求回来时，value已经发生过变化触发了this.setSelected()....\
所以最简单的方法就是当请求回来时手动调用一下el-select的方法setSelected

```jsx
const queryInterFunc = params => {
	interfaceFunc.value(paramsCom.value).then(async res => {
		const arr = res.records.map(i => {
			return formatResult(i)
		})
		emit('update:fieldOptions', arr)
		selectPageConfig.value.total = res.total
		if (params) {
			await nextTick()
			selectCom.value?.setSelected()
		}
	})
}
```

### 我们再看一下element-plus

```jsx
// 可以看到几乎和element-ui一致，只不过现在这个监听放到useSelect这个hook里了
  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        if (props.filterable && !props.reserveKeyword) {
          states.inputValue = ''
          handleQueryChange('')
        }
      }
      // 设置选中
      setSelected()
      if (!isEqual(val, oldVal) && props.validateEvent) {
        formItem?.validate('change').catch((err) => debugWarn(err))
      }
    },
    {
      flush: 'post',
      deep: true,
    }
  )
```

解决方法还是和之前的一样\
在接口返回时执行手动执行一下el-select的方法setSelected即可
