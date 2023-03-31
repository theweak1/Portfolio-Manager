import {
	findInvestorByUserId,
	updateInvestor,
	validateInvestorExists,
} from '../../models/investors.model.mjs';

import {
	updateUserEmail,
	updateUserPassword,
	validateProfileUpdate,
} from '../../models/users.model.mjs';

import {
	handleBadRequestResponse,
	handleErrorResponse,
} from '../../util/helpers.mjs';

async function httpGetInvestorProfileByUserId(req, res) {
	try {
		const userId = req.userId;
		const investor = await findInvestorByUserId(userId);
		if (!investor) {
			return handleBadRequestResponse(
				'This investor does not exist in the system.',
				res
			);
		}

		return res.status(200).json(investor);
	} catch (error) {
		return handleErrorResponse('get investor by user id', error, res);
	}
}

async function httpUpdateInvestorProfile(req, res) {
	try {
		const userInfo = {
			id: req.userId,
			email: req.body.email,
			password: req.body.currentPassword,
			newPassword: req.body.newPassword,
		};
		const investorInfo = {
			name: titleCase(req.body.name),
		};

		const validatedUser = await validateProfileUpdate(userInfo);
		if ('errorCode' in validatedUser) {
			return res.status(validatedUser.errorCode).json({
				error: validatedUser,
			});
		}

		const validatedInvestor = await validateInvestorExists(validatedUser.id);
		if ('errorCode' in validatedInvestor) {
			return res.status(validatedInvestor.errorCode).json({
				error: validatedInvestor,
			});
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
