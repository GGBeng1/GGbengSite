// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const SibApiV3Sdk = require('sib-api-v3-sdk');
const handler = async event => {
	let defaultClient = SibApiV3Sdk.ApiClient.instance;
	let apiKey = defaultClient.authentications['api-key'];
	apiKey.apiKey = process.env.PUBLIC_S_API_KEY;

	let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
	let apiInstance1 = new SibApiV3Sdk.ContactsApi();
	let apiInstance2 = new SibApiV3Sdk.TransactionalEmailsApi();
	let listId = 4;

	let opts = {
		modifiedSince: new Date('2022-01-01T19:20:30+01:00'),
		limit: 300,
		offset: 0,
	};
	let { contacts } = await apiInstance1.getContactsFromList(listId, opts);
	if (contacts && contacts.length > 0) {
		let emailList = contacts.map(i => {
			return {
				email: i.email,
			};
		});
		sendSmtpEmail = {
			to: emailList,
			templateId: 2,
		};

		let res = await apiInstance2.sendTransacEmail(sendSmtpEmail);
		return {
			statusCode: res ? 200 : 500,
			body: JSON.stringify({
				code: res ? 200 : 500,
			}),
		};
	}
};

module.exports = { handler };
