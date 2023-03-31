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

		const startupWithoutId = excludeFields(createdStartup, ['id']);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function findStartupById(startupId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				id: startupId,
			},
		});

		if (!startup) {
			return null;
		}

		return startup;
	} catch (error) {
		throw error;
	}
}

async function findStartupByUserId(userId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				userId: userId,
			},
		});

		if (!startup) {
			return null;
		}

		return excludeFields(startup, ['userId', 'investorIds']);
	} catch (error) {
		throw error;
	}
}

async function findUnApprovedStartups() {
	try {
		const startups = await prisma.startup.findMany({
			where: {
				user: {
					isApproved: false,
				},
			},
		});

		const filteredstartups = startups.map((s) => excludeFields(s, ['userId']));

		return filteredstartups;
	} catch (error) {
		throw error;
	}
}

async function updateStartup(id, email, startupInfo) {
	try {
		const updatedStartup = await prisma.startup.update({
			where: {
				id: id,
			},
			data: {
				companyName: !!startupInfo.companyName
					? startupInfo.companyName
					: undefined,
				email: !!email ? email : undefined,
			},
		});

		const startupWithoutId = excludeFields(updatedStartup, ['id']);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function validateStartupExists(userId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				userId: userId,
			},
		});
		if (!startup) {
			return buildErrorObject(
				401,
				'This startup does not exist in the system.'
			);
		}

		return startup;
	} catch (error) {
		throw error;
	}
}

async function investedStartupsbyInvestorId(investorId) {
	try {
		const startups = await prisma.startup.findMany({
			where: {
				investors: {
					some: {
						id: investorId,
					},
				},
			},
		});

		if (!startups.length) {
			return null;
		}

		const filteredstartups = startups.map((s) =>
			excludeFields(s, ['investorIds', 'userId'])
		);
		return filteredstartups;
	} catch (error) {
		throw error;
	}
}

async function addNewInvestor(startupId, investorId) {
	try {
		const NewInvestor = await prisma.startup.update({
			where: {
				id: startupId,
			},
			data: {
				investors: {
					connect: {
						id: investorId,
					},
				},
			},
		});
	} catch (error) {
		throw error;
	}
}

async function updateInvestorsList(startupId, investorsIds) {
	try {
		// Fetch the current investors for the startup
		const currentInvestors = await prisma.startup.findUnique({
			where: { id: startupId },
			select: { investors: { select: { id: true } } },
		});

		const currentInvestorIds = currentInvestors.investors.map(
			(investor) => investor.id
		);

		// Find new investors to connect
		const newInvestorIds = investorsIds
			.filter((investor) => !currentInvestorIds.includes(investor.id))
			.map((investor) => investor.id);

		// Find existing investors to disconnect
		const disconnectInvestorIds = currentInvestorIds.filter((investorId) => {
			const investor = investorsIds.find((inv) => inv.id === investorId);
			return !investor;
		});

		// Disconnect the filtered investors
		const disconnectResult = await prisma.startup.update({
			where: { id: startupId },
			data: {
				investors: { disconnect: disconnectInvestorIds.map((id) => ({ id })) },
			},
		});

		// Connect new investors
		const connectResult = await prisma.startup.update({
			where: { id: startupId },
			data: {
				investors: {
					connectOrCreate: newInvestorIds.map((id) => ({
						where: { id },
						create: { id },
					})),
				},
			},
		});

		const investorList = await prisma.startup.findUnique({
			where: { id: startupId },
		});

		return investorList;
	} catch (error) {
		throw error;
	}
}

async function getInvestors(startupId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: { id: startupId },
			select: { investors: { select: { email: true, name: true } } },
		});

		return startup;
	} catch (error) {
		throw error;
	}
}

export {
	createStartup,
	findStartupByUserId,
	findUnApprovedStartups,
	validateStartupExists,
	updateStartup,
	findStartupById,
	investedStartupsbyInvestorId,
	addNewInvestor,
	updateInvestorsList,
	getInvestors,
};
