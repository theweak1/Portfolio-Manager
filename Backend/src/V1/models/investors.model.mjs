import prisma from '../../database/index.mjs';
import { buildErrorObject, excludeFields } from '../util/helpers.mjs';

async function createInvestor(userId, email, investorInfo) {
	try {
		const createdInvestor = await prisma.Investor.create({
			data: {
				name: investorInfo.name,
				email: email,
				userId: userId,
			},
		});

		const investorWithoutId = excludeFields(createdInvestor, 'id');
		return investorWithoutId;
	} catch (error) {
		throw error;
	}
}

/*
TODO: Develop Investors 
*/

export { createInvestor };
