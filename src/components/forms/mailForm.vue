<template>
	<div class="newsletter-form__container">
		<div class="form-field__container">
			<input type="text" placeholder="hello@example.com" v-model="email" />
		</div>
		<button class="btn" rel="noopener noreferrer">
			Submit
			<span class="material-icons">chevron_right</span>
		</button>
	</div>
</template>

<script setup>
// import mailchimp from '@mailchimp/mailchimp_marketing';
import { ref } from 'vue';
const email = ref('');

	// let reg =
	// 	/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	// if (reg.test(email.value)) {
	// console.log(mailchimp, 111);
	// mailchimp.lists
	// 	.addListMember('64683b0612', {
	// 		email_address: email.value,
	// 		status: 'subscribed',
	// 	})
	// 	.then(res => {
	// 		console.log(res, 555);
	// 	});
// };
// defineExpose({ handlerSubmit });
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
	border: 2px solid var(--form-field-border-color, #ccc);
	color: var(--form-field-input-color, #000000);
	border-radius: var(--form-field-border-radius, 0.25rem);
	outline-style: none;
}
.form-field__container input:focus {
	border: 2px solid var(--form-field-border-focus-color, #000);
}
.btn {
	width: fit-content;
	padding: 0.36rem 0.92rem;
	margin-bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--theme-primary);
	color: var(--theme-on-primary);
	border: none;
	border-radius: var(--theme-button-border-radius);
	font-weight: 500;
}
.btn:hover {
	background-color: var(--theme-primary-hover);
}
.btn--unelevated {
	background-color: transparent;
	color: var(--theme-on-bg);
}
.btn--unelevated:hover {
	background-color: transparent;
	opacity: var(--theme-primary-hover);
}
.btn--outlined {
	color: var(--theme-primary);
	background-color: transparent;
	border: 2px solid var(--theme-primary);
	transition: background-color var(--theme-transition);
}
.btn--outlined:hover {
	background-color: var(--theme-primary);
	color: var(--theme-on-primary);
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
