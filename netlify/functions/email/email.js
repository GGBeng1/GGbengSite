// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const JSEncrypt = require('node-jsencrypt-fix');
const nodemailer = require('nodemailer');
// 开启一个 SMTP 连接池
const transport = nodemailer.createTransport({
	host: 'smtp.163.com', // qq邮箱主机
	secure: true, // 使用 SSL
	// secureConnection: true, // 使用 SSL
	port: 587, // SMTP 端口 或者587
	auth: {
		user: 'ggbeng1@163.com', // 账号：域名邮箱账号
		pass: process.env.PUBLIC_S_EMAIL, // 密码：SMPT获取的密码
	},
});
const handler = async event => {
	const email = event.queryStringParameters.email;
	const mysql = require('mysql2/promise');
	const connection = await mysql.createConnection({
		host: process.env.PUBLIC_S_MYSQLHOST, //数据库的IP地址
		user: 'ggbeng', //登录数据库的账号
		password: process.env.PUBLIC_S_MYSQLPASSWORD, //登录数据库的密码
		database: 'ggbeng', //指定要操作哪个数据库
	});
	// get the client
	// create the connection

	// query database
	const [rows] = await connection.execute('SELECT * FROM `email`');
	if (email && rows.find(i => i.email === email)) {
		connection.end();
		return {
			statusCode: 200,
			body: JSON.stringify({
				code: 500,
			}),
		};
	} else {
		// await connection.execute('INSERT INTO `email` (email) VALUES (?)', [email]);
		// connection.end();

		const mailOptions = {
			from: 'GGbeng<ggbeng1@163.com>', // 发件地址
			to: email, // 收件列表
			subject: '欢迎关注我的博客~', // 标题
			text: '欢迎关注, 我会在有新文章的时候给你发送邮件 📮', // 标题
		};
		await transport.sendMail(mailOptions, function (error, res) {
			if (error) {
				console.log('邮件发送失败: ' + error);
			}
			console.log('邮件发送成功: ' + JSON.stringify(res));
			transport.close();
		});
		return {
			statusCode: 200,
			body: JSON.stringify({ code: 200 }),
		};
	}

	// let query = event.headers.encrypted;
	// let decrypt = new JSEncrypt();
	// decrypt.setPrivateKey(process.env.PUBLIC_S_PRIKEY);
	// let uncrypted = decrypt.decrypt(query);
	// if (uncrypted !== process.env.PUBLIC_S_PASSWORD) {
	// 	return {
	// 		statusCode: 500,
	// 	};
	// }
	// let defaultClient = SibApiV3Sdk.ApiClient.instance;
	// let apiKey = defaultClient.authentications['api-key'];
	// apiKey.apiKey = process.env.PUBLIC_S_API_KEY;

	// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
	// let apiInstance1 = new SibApiV3Sdk.ContactsApi();
	// let apiInstance2 = new SibApiV3Sdk.TransactionalEmailsApi();
	// let listId = 4;

	// let opts = {
	// 	modifiedSince: new Date('2022-01-01T19:20:30+01:00'),
	// 	limit: 300,
	// 	offset: 0,
	// };
	// let { contacts } = await apiInstance1.getContactsFromList(listId, opts);
	// if (contacts && contacts.length > 0) {
	// 	let emailList = contacts.map(i => {
	// 		return {
	// 			email: i.email,
	// 		};
	// 	});
	// 	sendSmtpEmail = {
	// 		to: emailList,
	// 		templateId: 2,
	// 	};

	// 	let res = await apiInstance2.sendTransacEmail(sendSmtpEmail);
	// 	return {
	// 		statusCode: res ? 200 : 500,
	// 		body: JSON.stringify({
	// 			code: res ? 200 : 500,
	// 		}),
	// 	};
	// }
};

module.exports = { handler };
