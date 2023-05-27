import { createInvestor } from '../../models/investors.model.mjs';
import { createStartup, updateCodatId } from '../../models/startups.model.mjs';

import {
	createUser,
	findUserByEmail,
	findUserById,
	getUserTokens,
	isUserAuthorized,
	updateUserPassword,
	updateUserTokens
} from '../../models/users.model.mjs';

import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken
} from '../../services/auth.service.mjs';

import { HttpError, handleErrorResponse } from '../../models/http-error.mjs';
import { createCompany } from '../../services/codat.service.mjs';
import { isValidUUID, titleCase } from '../../util/helpers.mjs';

import { sendResetPasswordEmail } from '../../services/mail.service.mjs';

async function httpLogin(req, res, next) {
	try {
		const userInfo = {
			email: req.body.email,
			password: req.body.password
		};

		if (!userInfo.email || !userInfo.password) {
			const error = new HttpError(
				'User requires email and password to login into the system.',
				400
			);
			return next(error);
		}

		const userResponse = await isUserAuthorized(
			userInfo.email,
			userInfo.password
		);
		if ('code' in userResponse) {
			return next(userResponse);
		}

		const accessToken = generateAccessToken(userResponse.id);
		const refreshToken = generateRefreshToken(userResponse.id);

		await updateUserTokens(userResponse.id, accessToken, refreshToken);

		const expirationTime = parseInt('20m', 10) * 60 * 1000; // Parse the string as an integer

		return res.status(200).json({
			accessToken,
			refreshToken,
			email: userResponse.email,
			role: userResponse.role,
			expiresIn: new Date(new Date().getTime() + expirationTime),
			userId: userResponse.id
		});
	} catch (error) {
		return handleErrorResponse('login', error, res);
	}
}

async function httpSignupInvestor(req, res, next) {
	try {
		const userInfo = {
			email: req.body.email,
			password: req.body.password,
			role: titleCase(req.body.role)
		};
		const investorInfo = {
			name: titleCase(req.body.name)
		};

		if (
			!userInfo.email ||
			!userInfo.password ||
			!userInfo.role ||
			!investorInfo.name
		) {
			const error = new HttpError(
				'Investor is missing required fields for creation.',
				400
			);
			return next(error);
		}

		if (userInfo.role !== 'Investor') {
			const error = new HttpError(
				"Expected a role of 'Investor' but received " +
					userInfo.role +
					" instead. Please provide the 'Investor' role when creating a investor.",
				400
			);
			return next(error);
		}

		const userResponse = await createUser(
			userInfo.email,
			userInfo.password,
			userInfo.role,
			true
		);
		if ('code' in userResponse) {
			return next(userResponse);
		}

		const accessToken = generateAccessToken(userResponse.id);
		const refreshToken = generateRefreshToken(userResponse.id);
		await updateUserTokens(userResponse.id, accessToken, refreshToken);

		const investorResponse = await createInvestor(
			userResponse.id,
			userInfo.email,
			investorInfo
		);

		return res.status(200).json({
			accessToken,
			refreshToken,
			...investorResponse,
			isApproved: true
		});
	} catch (error) {
		return handleErrorResponse('signup investor', error, res);
	}
}

async function httpSignupStartup(req, res, next) {
	try {
		const userInfo = {
			email: req.body.email,
			password: req.body.password,
			role: titleCase(req.body.role)
		};
		const startupInfo = {
			companyName: titleCase(req.body.companyName)
		};

		if (
			!userInfo.email ||
			!userInfo.password ||
			!userInfo.role ||
			!startupInfo.companyName
		) {
			const error = new HttpError(
				'Startup is missing required fields for creation.',
				400
			);
			return next(error);
		}

		if (userInfo.role !== 'Startup') {
			const error = new HttpError(
				"Expected a role of 'startup' but received '" +
					userInfo.role +
					"' instead. Please provide the 'startup' role when creating a startup.",
				400
			);
			return next(error);
		}

		const userResponse = await createUser(
			userInfo.email,
			userInfo.password,
			userInfo.role
		);

		if ('code' in userResponse) {
			return next(userResponse);
		}

		const startupResponse = await createStartup(
			userResponse.id,
			userInfo.email,
			startupInfo
		);
		if ('code' in startupResponse) {
			return next(startupResponse);
		}
		const codatResponse = await createCompany(startupInfo.companyName);
		await updateCodatId(
			startupResponse.id,
			codatResponse.id,
			codatResponse.redirect
		);

		return res.status(200).json({
			...startupResponse,
			...codatResponse
		});
	} catch (error) {
		return handleErrorResponse('signup startup', error, res);
	}
}

async function httpLogout(req, res, next) {
	try {
		const userId = req.userId;
		const isValidId = isValidUUID(userId);

		if (!isValidId) {
			const error = new HttpError(
				'This Id passed in the URL parameter does not have a valid format.',
				400
			);
			return next(error);
		}

		await updateUserTokens(userId, '', '');
		return res.status(200).json('User has been logged out');
	} catch (error) {
		return handleErrorResponse('logout', error, res);
	}
}

async function httpRefreshToken(req, res, next) {
	try {
		const refreshToken = req.body.token;
		if (!refreshToken) {
			const error = new httpError('Token was not provided.', 401);
			return next(error);
		}

		const userRefreshToken = await getUserTokens(refreshToken);
		if (!userRefreshToken || refreshToken !== userRefreshToken.refreshToken) {
			const error = new httpError('Token is not valid for this users.', 401);
			return next(error);
		}

		const verifyTokenResponse = verifyRefreshToken(refreshToken);
		if ('code' in verifyTokenResponse) {
			return next(verifyTokenResponse);
		}

		const [accessToken, refreshedToken] = verifyTokenResponse;
		await updateUserTokens(userRefreshToken.id, accessToken, refreshedToken);

		return res
			.status(200)
			.json({ accessToken: accessToken, refreshedToken: refreshedToken });
	} catch (error) {
		return handleErrorResponse('refresh token', error, res);
	}
}

async function httpForgotPassword(req, res, next) {
	try {
		const email = req.body.email;

		if (!email) {
			const error = new httpError(
				"Can't reset password without providing an email address.",
				400
			);
			return next(error);
		}

		const user = await findUserByEmail(email);
		if (!user) {
			const error = new httpError(
				"Couldn't find user in the system. Please provide valid email address.",
				400
			);
			return next(error);
		}

		const accessToken = generateAccessToken(user.id);
		const refreshToken = generateRefreshToken(user.id);
		await updateUserTokens(user.id, accessToken, refreshToken);
		await sendResetPasswordEmail(email, accessToken);

		return res
			.status(200)
			.json({ status: 200, message: 'Reset Password Email has been sent.' });
	} catch (error) {
		return handleErrorResponse('forgot password', error, res);
	}
}

async function httpResetPassword(req, res, next) {
	try {
		const userId = req.userId;
		const password = req.body.password;

		if (!userId && !password) {
			const error = new httpError(
				"Can't reset password without providing an email address.",
				400
			);
			return next(error);
		}

		const user = await findUserById(userId);
		if (!user) {
			const error = new httpError(
				"Couldn't find user in the system. Please provide valid Access Token",
				400
			);
			return next(error);
		}

		const updatePasswordResponse = await updateUserPassword(user, password);
		return res.status(200).json(updatePasswordResponse);
	} catch (error) {
		return handleErrorResponse('reset password', error, res);
	}
}

export {
	httpLogin,
	httpSignupInvestor,
	httpSignupStartup,
	httpLogout,
	httpRefreshToken,
	httpForgotPassword,
	httpResetPassword
};
