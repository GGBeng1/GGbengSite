<template>
	<div class="newsletter-form__container">
		<div class="form-field__container">
			<input type="password" placeholder="password" v-model="email" />
		</div>
		<button class="btn" rel="noopener noreferrer" @click="handler">
			Submit
			<span class="material-icons">chevron_right</span>
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const handler = async () => {
	let reg = import.meta.env.PUBLIC_S_PASSWORD;
	if (reg !== email.value) {
		alert('请输入合法密码');
		return;
	}
	let pre = import.meta.env.PROD ? '/' : '/api';
	let res = await fetch(pre + '.netlify/functions/email');
	if (res.status == 200) {
		const json = await res.json();
		if (json.code == 200) {
			alert('发送邮件成功');
		} else {
			alert('发送邮件失败');
		}
	}
	// const json = res.json();
	// console.log(json);
	// const data = json.data
	// console.log(data);
};
</script>

<style>
.newsletter-form__container {
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 1rem;
}
@media (max-width: 600px) {
	.newsletter-form__container {
		grid-template-columns: 1fr;
	}
}
.form-field__container input[type='text'],
.form-field__container input[type='email'],
.form-field__container input[type='date'],
.form-field__container input[type='password'],
.form-field__container input[type='tel'] {
	width: 100%;
	padding: 0.5rem;
	border: 2px solid let(--form-field-border-color, #ccc);
	color: let(--form-field-input-color, #000000);
	border-radius: let(--form-field-border-radius, 0.25rem);
	outline-style: none;
}
.form-field__container input:focus {
	border: 2px solid let(--form-field-border-focus-color, #000);
}
.btn {
	width: fit-content;
	padding: 0.36rem 0.92rem;
	margin-bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: let(--theme-primary);
	color: let(--theme-on-primary);
	border: none;
	border-radius: let(--theme-button-border-radius);
	font-weight: 500;
}
.btn:hover {
	background-color: let(--theme-primary-hover);
}
.btn--unelevated {
	background-color: transparent;
	color: let(--theme-on-bg);
}
.btn--unelevated:hover {
	background-color: transparent;
	opacity: let(--theme-primary-hover);
}
.btn--outlined {
	color: let(--theme-primary);
	background-color: transparent;
	border: 2px solid let(--theme-primary);
	transition: background-color let(--theme-transition);
}
.btn--outlined:hover {
	background-color: let(--theme-primary);
	color: let(--theme-on-primary);
}
.material-icons {
	margin-left: 0.25rem;
}
a.btn {
	text-decoration: none;
}
button.btn {
	cursor: pointer;
	outline: none;
}
</style>
