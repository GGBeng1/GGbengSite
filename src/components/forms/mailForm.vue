<template>
	<div class="newsletter-form__container">
		<p style="display: flex; align-items: center; margin-bottom: 1rem">
			<a href="/rss.xml" style="text-decoration: none">RSS订阅</a
			><svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				width="24px"
				fill="currentColor"
				style="transform: scale(1)"
			>
				<path
					d="M5 21Q4.175 21 3.587 20.413Q3 19.825 3 19Q3 18.175 3.587 17.587Q4.175 17 5 17Q5.825 17 6.412 17.587Q7 18.175 7 19Q7 19.825 6.412 20.413Q5.825 21 5 21ZM17 21Q17 18.1 15.9 15.562Q14.8 13.025 12.888 11.112Q10.975 9.2 8.438 8.1Q5.9 7 3 7V4Q6.525 4 9.625 5.338Q12.725 6.675 15.025 8.975Q17.325 11.275 18.663 14.375Q20 17.475 20 21ZM11 21Q11 17.675 8.662 15.338Q6.325 13 3 13V10Q5.3 10 7.3 10.863Q9.3 11.725 10.788 13.212Q12.275 14.7 13.137 16.7Q14 18.7 14 21Z"
				></path>
			</svg>
		</p>
	</div>
	<div class="ml-embedded" data-form="3gbUJz"></div>
	<!-- <div class="newsletter-form__container">
		<div class="form-field__container">
			<input
				type="text"
				placeholder="你的邮箱: hello@example.com"
				v-model="email"
			/>
		</div>
		<button class="btn" rel="noopener noreferrer" @click="handler">
			订阅
			<span class="material-icons">chevron_right</span>
		</button>
	</div> -->
</template>
<!-- MailerLite Universal -->
<script>
(function (w, d, e, u, f, l, n) {
	(w[f] =
		w[f] ||
		function () {
			(w[f].q = w[f].q || []).push(arguments);
		}),
		(l = d.createElement(e)),
		(l.async = 1),
		(l.src = u),
		(n = d.getElementsByTagName(e)[0]),
		n.parentNode.insertBefore(l, n);
})(
	window,
	document,
	'script',
	'https://assets.mailerlite.com/js/universal.js',
	'ml',
);
ml('account', '311465');
</script>
<!-- End MailerLite Universal -->
<script setup>
import { ref } from 'vue';
const email = ref('');
const handler = async () => {
	let reg = /^\w+@([\da-z\.-]+)\.([a-z]+|[\u2E80-\u9FFF]+)$/;
	if (!reg.test(email.value)) {
		alert('请输入合法邮箱📮');
		return;
	}
	let pre = import.meta.env.PROD ? '/' : '/api';
	let res = await fetch(pre + '.netlify/functions/email?email=' + email.value);
	if (res.status == 200) {
		const json = await res.json();
		if (json.code == 200) {
			alert('订阅成功🎉 , 请勿重复订阅');
		} else {
			alert('每个邮箱📮只能订阅一次📌');
		}
	}
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
.ml-form-embedWrapper.embedForm {
	max-width: unset !important;
}
</style>
