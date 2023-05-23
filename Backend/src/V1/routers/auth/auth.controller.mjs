import { createInvestor } from '../../models/investors.model.mjs';
import { createStartup, updateCodatId } from '../../models/startups.model.mjs';

import {
	createUser,
	findEmailById,
	findUserByEmail,
	findUserById,
	getUserTokens,
	isUserAuthorized,
	updateUserEmail,
	updateUserPassword,
	updateUserTokens,
	validateProfileUpdate
} from '../../models/users.model.mjs';

import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken
} from '../../services/auth.service.mjs';

import { HttpError, handleErrorResponse } from '../../models/http-error.mjs';
import { createCompany } from '../../services/codat.service.mjs';
import { excludeFields, isValidUUID, titleCase } from '../../util/helpers.mjs';

import {
	sendRequestStartupEmail,
	sendResetPasswordEmail
} from '../../services/mail.service.mjs';

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

		return res.status(200).json({
			accessToken,
			refreshToken,
			email: userResponse.email,
			role: userResponse.role,
			expiresIn: new Date(new Date().getTime() + 3600000 * '5h'.split('')[0]),
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
			// return handleBadRequestResponse(
			// 	'Investor is missing required fields for creation.',
			// 	res
			// );
		}

		if (userInfo.role !== 'Investor') {
			const error = new HttpError(
				"Expected a role of 'Investor' but received " +
					userInfo.role +
					" instead. Please provide the 'Investor' role when creating a investor.",
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	"Expected a role of 'Investor' but received " +
			// 		userInfo.role +
			// 		" instead. Please provide the 'Investor' role when creating a investor.",
			// 	res
			// );
		}

		const userResponse = await createUser(
			userInfo.email,
			userInfo.password,
			userInfo.role,
			true
		);
		if ('code' in userResponse) {
			return next(userResponse);
			// return res.status(userResponse.errorCode).json({
			// 	error: userResponse
			// });
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

async function httpSignupAdmin(req, res, next) {
	try {
		const userInfo = {
			email: req.body.email,
			password: req.body.password,
			role: 'Admin'
		};

		if (!userInfo.email || !userInfo.password || !userInfo.role) {
			const error = new HttpError(
				"The following fields need to be provided in order to signup: 'email' and 'password'.",
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	"The following fields need to be provided in order to signup: 'email' and 'password'.",
			// 	res
			// );
		}

		const createdUser = await createUser(
			userInfo.email,
			userInfo.password,
			userInfo.role,
			true
		);
		if ('code' in createdUser) {
			return createdUser;
			// return res.status(createdUser.errorCode).json({
			// 	error: createdUser
			// });
		}

		const accessToken = generateAccessToken(createdUser.id);
		const refreshToken = generateRefreshToken(createdUser.id);
		const updatedUser = await updateUserTokens(
			createdUser.id,
			accessToken,
			refreshToken
		);

		return res.status(200).json(updatedUser);
	} catch (error) {
		return handleErrorResponse('signup admin', error, res);
	}
}

async function httpGetAdminProfile(req, res, next) {
	try {
		const userId = req.userId;
		const user = await findEmailById(userId);
		if (!user) {
			const error = new HttpError(
				"A user with this Id wasn't found.Please provide a valid Id.",
				404
			);
			return next(error);
			// return handleNotFoundResponse(
			// 	"A user with this Id wasn't found.Please provide a valid Id.",
			// 	res
			// );
		}

		return res.status(200).json(user);
	} catch (error) {
		return handleErrorResponse('get admin profile', error, res);
	}
}

async function httpUpdateAdmin(req, res, next) {
	try {
		const userId = req.userId;
		const isValidId = isValidUUID(userId);

		if (!isValidId) {
			const error = new HttpError(
				'This Id passed in the URL parameter is not does not have a valid format.',
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	'This Id passed in the URL parameter is not does not have a valid format.',
			// 	res
			// );
		}

		const userInfo = {
			id: userId,
			email: req.body.email,
			password: req.body.currentPassword,
			newPassword: req.body.newPassword,
			isApproved: true
		};
		const validatedUserResponse = await validateProfileUpdate(userInfo);
		if ('code' in validatedUserResponse) {
			return next(validatedUserResponse);
			// return res.status(validatedUserResponse.errorCode).json({
			// 	error: validatedUserResponse
			// });
		}

		if (userInfo.email) {
			await updateUserEmail(validatedUserResponse, userInfo.email);
		}

		if (userInfo.newPassword) {
			await updateUserPassword(validatedUserResponse, userInfo.newPassword);
		}

		const updatedUser = await findUserById(userId);
		if (!updatedUser) {
			const error = new HttpError(
				"Couldn't find user in the system. Please provide valid Access Token",
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	"Couldn't find user in the system. Please provide valid Access Token",
			// 	res
			// );
		}

		const userFiltered = excludeFields(updatedUser, [
			'id',
			'password',
			'passwordSalt'
		]);

		return res.status(200).json(userFiltered);
	} catch (error) {
		return handleErrorResponse('update admin', error, res);
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
			// return handleBadRequestResponse(
			// 	'This Id passed in the URL parameter does not have a valid format.',
			// 	res
			// );
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
			// return res.status(error.errorCode).json({ error: error });
		}

		const userRefreshToken = await getUserTokens(refreshToken);
		if (!userRefreshToken || refreshToken !== userRefreshToken.refreshToken) {
			const error = new httpError('Token is not valid for this users.', 401);
			return next(error);
			// return res.status(error.errorCode).json({ error: error });
		}

		const verifyTokenResponse = verifyRefreshToken(refreshToken);
		if ('code' in verifyTokenResponse) {
			return next(verifyTokenResponse);
			// return res.status(verifyTokenResponse.errorCode).json({
			// 	error: verifyTokenResponse
			// });
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
			// return handleBadRequestResponse(
			// 	"Can't reset password without providing an email address.",
			// 	res
			// );
		}

		const user = await findUserByEmail(email);
		if (!user) {
			const error = new httpError(
				"Couldn't find user in the system. Please provide valid email address.",
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	"Couldn't find user in the system. Please provide valid email address.",
			// 	res
			// );
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
			// return handleBadRequestResponse(
			// 	"Can't reset password without providing an email address.",
			// 	res
			// );
		}

		const user = await findUserById(userId);
		if (!user) {
			const error = new httpError(
				"Couldn't find user in the system. Please provide valid Access Token",
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	"Couldn't find user in the system. Please provide valid Access Token",
			// 	res
			// );
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
	httpResetPassword,
	httpSignupAdmin,
	httpGetAdminProfile,
	httpUpdateAdmin
};
