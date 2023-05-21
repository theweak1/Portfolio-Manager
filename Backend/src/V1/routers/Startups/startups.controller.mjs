import {
	addNewInvestor,
	findStartupById,
	findStartupByUserId,
	getCaptable,
	getInvestors,
	getStartupByIdAndInvestorId,
	investedStartupsbyInvestorId,
	updateCaptable,
	updateInvestorsList,
	updateStartup,
	validateStartupExistsByStartupId,
	validateStartupExistsByUserId
} from '../../models/startups.model.mjs';

import {
	updateUserEmail,
	updateUserPassword,
	validateProfileUpdate
} from '../../models/users.model.mjs';

import {
	findInvestorByEmail,
	findInvestorByUserId
} from '../../models/investors.model.mjs';

import { handleErrorResponse, HttpError } from '../../models/http-error.mjs';

import { titleCase } from '../../util/helpers.mjs';

import {
	getBalanceSheet,
	getProfitAndLoss
} from '../../services/codat.service.mjs';

import { sendInvestorInvitationEmail } from '../../services/mail.service.mjs';

async function httpGetStartupProfileByUserId(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
		}

		return res.status(200).json(startupResponse);
	} catch (error) {
		return handleErrorResponse('get startup by user id', error, res);
	}
}

async function httpUpdateStartupProfile(req, res, next) {
	try {
		const userInfo = {
			id: req.userId,
			email: req.body.email,
			password: req.body.currentPassword,
			newPassword: req.body.newPassword
		};
		const startupInfo = {
			companyName: titleCase(req.body.companyName)
		};

		const validatedUserResponse = await validateProfileUpdate(userInfo);
		if ('code' in validatedUserResponse) {
			return next(validatedUserResponse);
		}

		const validatedStartupResponse = await validateStartupExistsByUserId(
			validatedUserResponse.id
		);
		if ('code' in validatedStartupResponse) {
			return next(validatedStartupResponse);
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

async function httpGetStartupsByInvestorId(req, res, next) {
	try {
		const userId = req.userId;

		const investorResponse = await findInvestorByUserId(userId);
		if (!investorResponse) {
			const error = new HttpError(
				'This investor does not exist in the system.',
				400
			);
			return next(error);
		}

		const startups = await investedStartupsbyInvestorId(investorResponse.id);

		if (!startups) {
			const error = new HttpError(
				'You are not inveted to view any startups portfolio.',
				404
			);
			return next(error);
		}

		return res.status(200).json({ startups: startups });
	} catch (error) {
		return handleErrorResponse('get startups by investor id', error, res);
	}
}

async function httpNewInvestors(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
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

async function httpUpdateInvestor(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
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

async function httpGetInvestors(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
		}

		const investors = await getInvestors(startupResponse.id);

		return res.status(200).json(investors);
	} catch (error) {
		return handleErrorResponse('get investors by startup id', error, res);
	}
}

async function httpGetSpecificStartupProfile(req, res, next) {
	try {
		const userId = req.userId;
		const investorResponse = await findInvestorByUserId(userId);

		if (!investorResponse) {
			const error = new HttpError(
				'This investor does not exist in the system.',
				400
			);
			return next(error);
		}
		const startupId = req.params.startupId;

		const startupResponse = await validateStartupExistsByStartupId(startupId);

		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
		}

		const startup = await getStartupByIdAndInvestorId(
			startupId,
			investorResponse.id
		);

		if (!startup) {
			const error = new HttpError(
				'You are not invited to view this startup portfolio.',
				404
			);
			return next(error);
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

async function HttpPostCaptable(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);
		if (!startupResponse) {
			const error = new HttpError(
				'This startup does not exist in the system.',
				400
			);
			return next(error);
		}

		const captable = req.body.data;

		const captableResponse = await updateCaptable(startupResponse.id, captable);

		return res.status(200).json(captableResponse);
	} catch (error) {
		return handleErrorResponse('Post captable', error, res);
	}
}

async function httpGetPL(req, res, next) {
	try {
		const userId = req.userId;
		const investorResponse = await findInvestorByUserId(userId);

		if (!investorResponse) {
			const error = new HttpError(
				'An investor with this id does not exist in the system',
				400
			);
			return next(error);
		}

		const startupId = req.body.startupId;

		const startupResponse = await findStartupById(startupId);
		if (!startupResponse) {
			const error = new HttpError(
				'A startup with this id does not exist in the system',
				400
			);
			return next(error);
		}

		const codatResponse = await getProfitAndLoss(
			startupResponse.codatId,
			12,
			1
		);
		const costOfGoodsSold = codatResponse.reports[0].costOfSales.value;
		const OperatingExprenses = codatResponse.reports[0].expenses.value;
		const revenue =
			codatResponse.reports[0].income.value +
			codatResponse.reports[0].otherIncome.value;
		const allExpenses =
			codatResponse.reports[0].expenses.value +
			codatResponse.reports[0].otherExpenses.value;
		res.status(200).json({
			costOfGoodsSold: costOfGoodsSold,
			OperatingExprenses: OperatingExprenses,
			revenue: revenue,
			allExpenses: allExpenses
		});
	} catch (error) {
		return handleErrorResponse('Get PL', error, res);
	}
}

async function httpGetBalanceSheet(req, res, next) {
	try {
		const userId = req.userId;
		const investorResponse = await findInvestorByUserId(userId);

		if (!investorResponse) {
			const error = new HttpError(
				'An investor with this id does not exist in the system',
				400
			);
			return next(error);
		}

		const startupId = req.body.startupId;

		const startupResponse = await findStartupById(startupId);
		if (!startupResponse) {
			const error = new HttpError(
				'A startup with this id does not exist in the system',
				400
			);
			return next(error);
		}

		const codatResponse = await getBalanceSheet(startupResponse.codatId, 12, 1);
		const cashInBank = codatResponse.reports[0].assets.items[0].value;

		res.status(200).json({
			cashInBank: cashInBank
		});
	} catch (error) {
		return handleErrorResponse('Get balance Sheet', error, res);
	}
}

async function HttpGetCaptable(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);

		if (!startupResponse) {
			const investorResponse = await findInvestorByUserId(userId);
			if (!investorResponse) {
				const error = new HttpError(
					'An investor with this id does not exist in the system',
					400
				);
				return next(error);
			} else if (investorResponse) {
				const startupId = req.body.startupId;
				const startupResponse = await findStartupById(startupId, startupId);
				if (!startupResponse) {
					const error = new HttpError(
						'This startup does not exist in the system.',
						400
					);
					return next(error);
				}

				const captable = await getCaptable(startupResponse.id);

				res.status(200).json({ data: captable });
			} else {
				const error = new HttpError(
					'This startup does not exist in the system.',
					400
				);
				return next(error);
			}
		} else {
			const captable = await getCaptable(startupResponse.id);

			res.status(200).json({ data: captable });
		}
	} catch (error) {
		return handleErrorResponse('Get captable', error, res);
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
	HttpPostCaptable,
	httpGetPL,
	HttpGetCaptable,
	httpGetBalanceSheet
};
