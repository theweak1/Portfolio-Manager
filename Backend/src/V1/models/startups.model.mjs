import prisma from '../../database/index.mjs';
import { buildErrorObject, excludeFields } from '../util/helpers.mjs';

async function createStartup(userId, email, startupInfo) {
	try {
		const createdStartup = await prisma.startup.create({
			data: {
				companyName: startupInfo.companyName,
				email: email,
				userId: userId,
			},
		});

		const startupWithoutId = excludeFields(createdStartup, 'id');
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

export { createStartup };
