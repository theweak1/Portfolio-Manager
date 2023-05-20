import {
	findInvestorByUserId,
	updateInvestor,
	validateInvestorExists
} from '../../models/investors.model.mjs';

import {
	updateUserEmail,
	updateUserPassword,
	validateProfileUpdate
} from '../../models/users.model.mjs';

import { HttpError, handleErrorResponse } from '../../models/http-error.mjs';

async function httpGetInvestorProfileByUserId(req, res, next) {
	try {
		const userId = req.userId;
		const investor = await findInvestorByUserId(userId);
		if (!investor) {
			const error = new HttpError(
				'This investor does not exist in the system.',
				400
			);
			return next(error);
			// return handleBadRequestResponse(
			// 	'This investor does not exist in the system.',
			// 	res
			// );
		}

		return res.status(200).json(investor);
	} catch (error) {
		return handleErrorResponse('get investor by user id', error, res);
	}
}

async function httpUpdateInvestorProfile(req, res, next) {
	try {
		const userInfo = {
			id: req.userId,
			email: req.body.email,
			password: req.body.currentPassword,
			newPassword: req.body.newPassword
		};
		const investorInfo = {
			name: titleCase(req.body.name)
		};

		const validatedUser = await validateProfileUpdate(userInfo);
		if ('code' in validatedUser) {
			return next(validatedUser);
			// return res.status(validatedUser.errorCode).json({
			// 	error: validatedUser,
			// });
		}

		const validatedInvestor = await validateInvestorExists(validatedUser.id);
		if ('code' in validatedInvestor) {
			return next(validatedInvestor);
			// return res.status(validatedInvestor.errorCode).json({
			// 	error: validatedInvestor,
			// });
		}

		if (userInfo.email) {
			await updateUserEmail(validatedUser, userInfo.email);
		}

		if (userInfo.newPassword) {
			await updateUserPassword(validatedUser, userInfo.newPassword);
		}

		const updatedInvestor = await updateInvestor(
			validatedInvestor.id,
			userInfo.email,
			investorInfo
		);

		return res.status(200).json(updatedInvestor);
	} catch (error) {
		return handleErrorResponse('update student profile', error, res);
	}
}

export { httpGetInvestorProfileByUserId, httpUpdateInvestorProfile };
