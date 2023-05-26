import axios from 'axios';

const FROM_ADDRESS = process.env.PORTFOLIO_ADDRESS ?? '';
const SENGRID_API_KEY = process.env.SENDGRID_API_KEY ?? '';
const EMAIL_SEND_URL = process.env.SENDGRID_EMAIL_SEND_URL ?? '';

async function sendResetPasswordEmail(toEmail, accessToken) {
	try {
		const RESET_PASSWORD_TEMPLATE_ID =
			process.env.RESET_PASSWORD_TEMPLATE_ID ?? '';
		const _email = {
			from: {
				email: FROM_ADDRESS,
				name: 'Portfolio Manager'
			},
			template_id: RESET_PASSWORD_TEMPLATE_ID,
			personalizations: [
				{
					to: [
						{
							email: toEmail
						}
					],
					dynamic_template_data: {
						accessToken: accessToken
					}
				}
			],
			reply_to: {
				email: FROM_ADDRESS,
				name: 'Reply'
			}
		};

		return axios({
			method: 'post',
			url: EMAIL_SEND_URL,
			headers: {
				Authorization: `Bearer ${SENGRID_API_KEY}`
			},
			data: _email
		});
	} catch (error) {
		throw error;
	}
}

async function newUpdateNotification(startupName, name, email) {
	try {
		const NEW_POST_NOTIFICATION_TEMPLATE_ID =
			process.env.NEW_POST_NOTIFICATION_TEMPLATE_ID ?? '';
		const _email = {
			from: {
				email: FROM_ADDRESS,
				name: 'Portfolio Manager'
			},
			template_id: NEW_POST_NOTIFICATION_TEMPLATE_ID,
			personalizations: [
				{
					to: [
						{
							name: name,
							email: email
						}
					],
					dynamic_template_data: {
						companyName: startupName
					}
				}
			],
			reply_to: {
				email: FROM_ADDRESS,
				name: 'Reply'
			}
		};

		return axios({
			method: 'post',
			url: EMAIL_SEND_URL,
			headers: {
				Authorization: `Bearer ${SENGRID_API_KEY}`
			},
			data: _email
		});
	} catch (error) {
		throw error;
	}
}

export { sendResetPasswordEmail, newUpdateNotification };
