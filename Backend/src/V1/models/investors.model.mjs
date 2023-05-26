import prisma from '../../database/index.mjs';

import { excludeFields } from '../util/helpers.mjs';

async function createInvestor(userId, email, investorInfo) {
	try {
		const createdInvestor = await prisma.Investor.create({
			data: {
				name: investorInfo.name,
				email: email,
				userId: userId
			}
		});

		const investorWithoutId = excludeFields(createdInvestor, ['id']);
		return investorWithoutId;
	} catch (error) {
		throw error;
	}
}

async function findInvestorByUserId(userId) {
	try {
		const investor = await prisma.investor.findUnique({
			where: {
				userId: userId
			},
			include: {
				startups: {
					select: {
						companyName: true
					}
				}
			}
		});

		if (!investor) {
			return null;
		}

		const filteredInvestor = excludeFields(investor, ['userId', 'startupIDs']);
		return filteredInvestor;
	} catch (error) {
		throw error;
	}
}

async function findInvestorByEmail(newInvestors) {
	try {
		const investors = [];

		for (const investor of newInvestors) {
			const response = await prisma.investor.findUnique({
				where: {
					email: investor.email
				}
			});

			investors.push({
				email: investor.email,
				id: response ? response.id : ''
			});
		}
		return investors;
	} catch (error) {
		throw error;
	}
}

export { createInvestor, findInvestorByUserId, findInvestorByEmail };
