// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import SibApiV3Sdk from 'sib-api-v3-sdk';
const handler = async event => {
	try {
		let defaultClient = SibApiV3Sdk.ApiClient.instance;
		let apiKey = defaultClient.authentications['api-key'];
		apiKey.apiKey = process.env.PUBLIC_S_API_KEY;

		let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
		let apiInstance1 = new SibApiV3Sdk.ContactsApi();
		let apiInstance2 = new SibApiV3Sdk.TransactionalEmailsApi();
		let listId = 4;

		let opts = {
			modifiedSince: new Date('2021-01-01T19:20:30+01:00'),
			limit: 50,
			offset: 0,
		};
		let res1 = apiInstance1.getContactsFromList(listId, opts);
		if (res1) {
			return {
				statusCode: 200,
				data: res1,
			};
		}
		sendSmtpEmail = {
			to: [
				{
					email: 'testmail@example.com',
				},
			],
			templateId: 59,
		};

		let res = await apiInstance2.sendTransacEmail(sendSmtpEmail);
		if (res) {
			return {
				statusCode: 200,
			};
		} else {
			return {
				statusCode: 500,
				body: error.toString(),
			};
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

module.exports = { handler };
