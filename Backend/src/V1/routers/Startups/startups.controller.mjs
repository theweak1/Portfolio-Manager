import {
	addNewInvestor,
	findStartupByUserId,
	getInvestors,
	getStartupByIdAndInvestorId,
	investedStartupsbyInvestorId,
	updateInvestorsList,
	updateStartup,
	validateStartupExistsByStartupId,
	validateStartupExistsByUserId,
} from '../../models/startups.model.mjs';

import {
	updateUserEmail,
	updateUserPassword,
	validateProfileUpdate,
} from '../../models/users.model.mjs';

import {
	findInvestorByEmail,
	findInvestorByUserId,
} from '../../models/investors.model.mjs';

import {
	handleBadRequestResponse,
	handleErrorResponse,
	handleNotFoundResponse,
	titleCase,
} from '../../util/helpers.mjs';

import { sendInvestorInvitationEmail } from '../../services/mail.service.mjs';

async function httpGetStartupProfileByUserId(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		return res.status(200).json(startupResponse);
	} catch (error) {
		return handleErrorResponse('get startup by user id', error, res);
	}
}

async function httpUpdateStartupProfile(req, res) {
	try {
		const userInfo = {
			id: req.userId,
			email: req.body.email,
			password: req.body.currentPassword,
			newPassword: req.body.newPassword,
		};
		const startupInfo = {
			companyName: titleCase(req.body.companyName),
		};

		const validatedUserResponse = await validateProfileUpdate(userInfo);
		if ('errorCode' in validatedUserResponse) {
			return res.status(validatedUserResponse.errorCode).json({
				error: validatedUserResponse,
			});
		}

		const validatedStartupResponse = await validateStartupExistsByUserId(
			validatedUserResponse.id
		);
		if ('errorCode' in validatedStartupResponse) {
			return res.status(validatedStartupResponse.errorCode).json({
				error: validatedStartupResponse,
			});
		}

		if (userInfo.email) {
			await updateUserEmail(validatedUserResponse, userInfo.email);
		}

		if (userInfo.newPassword) {
			await updateUserPassword(validatedUserResponse, userInfo.newPassword);
		}

		const updateStartupResponse = await updateStartup(
			validatedStartupResponse.id,
			userInfo.email,
			startupInfo
		);

		return res.status(200).json(updateStartupResponse);
	} catch (error) {
		return handleErrorResponse('update startup profile', error, res);
	}
}

async function httpGetStartupsByInvestorId(req, res) {
	try {
		const userId = req.userId;

		const investorResponse = await findInvestorByUserId(userId);
		if (!investorResponse) {
			return handleBadRequestResponse(
				'This investor does not exist in the system.',
				res
			);
		}

		const startups = await investedStartupsbyInvestorId(investorResponse.id);

		if (!startups) {
			return handleNotFoundResponse(
				'You are not inveted to view any startups portfolio.',
				res
			);
		}

		return res.status(200).json(startups);
	} catch (error) {
		return handleErrorResponse('get startups by investor id', error, res);
	}
}

async function httpNewInvestors(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}
		const newInvestors = req.body.investors;

		const investorsResponse = await findInvestorByEmail(newInvestors);

		for (const investor of investorsResponse) {
			if (!Boolean(investor.id)) {
				// TODO: uncomment below line to send invite email
				// await sendInvestorInvitationEmail(startupResponse, investor.email);
				console.log('Invitiation email sent');
			} else {
				await addNewInvestor(startupResponse.id, investor.id);
			}
		}

		return res.status(200).json(investorsResponse);
	} catch (error) {
		return handleErrorResponse('post new investors', error, res);
	}
}

async function httpUpdateInvestor(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}
		const InvestorList = req.body.investors;

		const investorsResponse = await findInvestorByEmail(InvestorList);

		const investorListUpdated = await updateInvestorsList(
			startupResponse.id,
			investorsResponse
		);

		return res.status(200).json(investorListUpdated);
	} catch (error) {
		return handleErrorResponse('update investors', error, res);
	}
}

async function httpGetInvestors(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		const investors = await getInvestors(startupResponse.id);

		return res.status(200).json(investors);
	} catch (error) {
		return handleErrorResponse('get investors by startup id', error, res);
	}
}

async function httpGetSpecificStartupProfile(req, res) {
	try {
		const userId = req.userId;
		const investorResponse = await findInvestorByUserId(userId);

		if (!investorResponse) {
			return handleBadRequestResponse(
				'This investor does not exist in the system.',
				res
			);
		}
		const startupId = req.params.startupId;

		const startupResponse = await validateStartupExistsByStartupId(startupId);

		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		const startup = await getStartupByIdAndInvestorId(
			startupId,
			investorResponse.id
		);

		if (!startup) {
			return handleNotFoundResponse(
				'You are not invited to view this startup portfolio.',
				res
			);
		}

		res.status(200).json(startup);
	} catch (error) {
		return handleErrorResponse(
			'get specific startup by startup id',
			error,
			res
		);
	}
}

export {
	httpGetStartupProfileByUserId,
	httpUpdateStartupProfile,
	httpGetStartupsByInvestorId,
	httpNewInvestors,
	httpUpdateInvestor,
	httpGetInvestors,
	httpGetSpecificStartupProfile,
};
