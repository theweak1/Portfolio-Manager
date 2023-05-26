import {
	addNewInvestor,
	findStartupById,
	findStartupByUserId,
	getCaptable,
	getInvestors,
	investedStartupsbyInvestorId,
	updateCaptable
} from '../../models/startups.model.mjs';

import {
	findInvestorByEmail,
	findInvestorByUserId
} from '../../models/investors.model.mjs';

import { handleErrorResponse, HttpError } from '../../models/http-error.mjs';

import {
	getBalanceSheet,
	getProfitAndLoss
} from '../../services/codat.service.mjs';

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
				'You are not invited to view any startups portfolio.',
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
			} else {
				await addNewInvestor(startupResponse.id, investor.id);
			}
		}

		return res.status(200).json(investorsResponse);
	} catch (error) {
		return handleErrorResponse('post new investors', error, res);
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

async function httpGetKPI(req, res, next) {
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

		const startupId = req.params.startupId;
		const periodLength = req.body.periodLength;
		const periodToCompare = req.body.periodToCompare;
		const startMonth = req.body.startMonth;

		const startupResponse = await findStartupById(startupId);
		if (!startupResponse) {
			const error = new HttpError(
				'A startup with this id does not exist in the system',
				400
			);
			return next(error);
		}

		// For more information https://docs.codat.io/accounting-api#/operations/get-profit-and-loss
		let codatResponse;
		codatResponse = await getProfitAndLoss(
			startupResponse.codatId,
			periodLength,
			periodToCompare,
			startMonth
		);
		console.log(codatResponse);
		const costOfGoodsSold = codatResponse.reports[0].costOfSales.value;
		const OperatingExprenses = codatResponse.reports[0].expenses.value;
		const revenue =
			codatResponse.reports[0].income.value +
			codatResponse.reports[0].otherIncome.value;
		const allExpenses =
			codatResponse.reports[0].expenses.value +
			codatResponse.reports[0].otherExpenses.value;

		// For more information https://docs.codat.io/accounting-api#/operations/get-balance-sheet
		codatResponse = await getBalanceSheet(
			startupResponse.codatId,
			periodLength,
			periodToCompare,
			startMonth
		);
		const cashAndBank = codatResponse.reports[0].assets.items[0].value;

		res.status(200).json({
			costOfGoodsSold: costOfGoodsSold,
			OperatingExprenses: OperatingExprenses,
			revenue: revenue,
			allExpenses: allExpenses,
			cashAndBank: cashAndBank
		});
	} catch (error) {
		return handleErrorResponse('Get KPI', error, res);
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

		const startupId = req.params.startupId;
		const periodLength = req.body.periodLength;
		const periodToCompare = req.body.periodToCompare;
		const startMonth = req.body.startMonth;
		const startupResponse = await findStartupById(startupId);
		if (!startupResponse) {
			const error = new HttpError(
				'A startup with this id does not exist in the system',
				400
			);
			return next(error);
		}

		//For more information https://dos.codat.io/accounting-api#/operations/get-profit-and-loss
		let codatResponse;
		codatResponse = await getProfitAndLoss(
			startupResponse.codatId,
			periodLength,
			periodToCompare,
			startMonth
		);
		const income = codatResponse.reports[0].income.value;
		const costOfSales = codatResponse.reports[0].costOfSales.value;
		const expenses = codatResponse.reports[0].expenses.value;
		const revenue =
			codatResponse.reports[0].income.value +
			codatResponse.reports[0].otherIncome.value;
		const allExpenses =
			codatResponse.reports[0].expenses.value +
			codatResponse.reports[0].otherExpenses.value;
		const grossProfit = (revenue - allExpenses) / revenue;

		//For more information https://docs.codat.io/accounting-api#/operations/get-balance-sheet
		codatResponse = await getBalanceSheet(
			startupResponse.codatId,
			periodLength,
			periodToCompare,
			startMonth
		);
		const cashAndBank = codatResponse.reports[0].assets.items[0].value;
		const assets = codatResponse.reports[0].assets.value;
		const liabilities = codatResponse.reports[0].liabilities.value;
		const equity = codatResponse.reports[0].equity.value;

		res.status(200).json({
			income: income,
			costOfSales: costOfSales,
			expenses: expenses,
			revenue: revenue,
			allExpenses: allExpenses,
			grossProfit: grossProfit,
			cashInBank: cashInBank,
			assets: assets,
			liabilities: liabilities,
			equity: equity
		});
	} catch (error) {
		return handleErrorResponse('Get PL', error, res);
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
				const startupId = req.params.startupId;
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
	httpGetStartupsByInvestorId,
	httpNewInvestors,
	httpGetInvestors,
	HttpPostCaptable,
	httpGetPL,
	HttpGetCaptable,
	httpGetKPI
};
