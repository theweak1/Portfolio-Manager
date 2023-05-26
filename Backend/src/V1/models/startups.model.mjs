import prisma from '../../database/index.mjs';

import { excludeFields } from '../util/helpers.mjs';
import { HttpError } from './http-error.mjs';

import { newUpdateNotification } from '../services/mail.service.mjs';

async function createStartup(userId, email, startupInfo) {
	try {
		const createdStartup = await prisma.startup.create({
			data: {
				companyName: startupInfo.companyName,
				email: email,
				codatId: startupInfo.codatId,
				userId: userId
			}
		});

		const startupWithoutId = excludeFields(createdStartup, [
			'codatId',
			'investorIds'
		]);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function findStartupById(startupId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				id: startupId
			}
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
				userId: userId
			},
			include: {
				investors: {
					select: {
						name: true,
						email: true
					}
				},
				blog: {
					select: {
						id: true,
						title: true,
						description: true,
						lastModified: true
					}
				}
			}
		});

		if (!startup) {
			return null;
		}

		return excludeFields(startup, ['userId', 'investorIds']);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function investedStartupsbyInvestorId(investorId) {
	try {
		const startups = await prisma.startup.findMany({
			where: {
				investors: {
					some: {
						id: investorId
					}
				}
			},
			select: {
				id: true,
				companyName: true,
				email: true,
				codatId: true
			}
		});

		if (!startups.length) {
			return null;
		}

		const filteredStartups = startups.map((s) =>
			excludeFields(s, ['investorIds', 'userId', 'codatId', 'email'])
		);
		return filteredStartups;
	} catch (error) {
		throw error;
	}
}

async function addNewInvestor(startupId, investorId) {
	try {
		const NewInvestor = await prisma.startup.update({
			where: {
				id: startupId
			},
			data: {
				investors: {
					connect: {
						id: investorId
					}
				}
			}
		});

		return NewInvestor;
	} catch (error) {
		throw error;
	}
}

async function getInvestors(startupId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: { id: startupId },
			select: {
				companyName: true,
				investors: {
					select: {
						email: true,
						name: true,
						id: true
					}
				}
			}
		});
		return startup;
	} catch (error) {
		throw error;
	}
}

async function updateCodatId(id, companyId, redirectLink) {
	try {
		const updatedStartup = await prisma.startup.update({
			where: {
				id: id
			},
			data: {
				codatId: companyId,
				redirectLink: redirectLink
			}
		});

		const startupWithoutId = excludeFields(updatedStartup, ['id']);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function updateCaptable(startupId, captable) {
	try {
		const startup = await prisma.startup.update({
			where: {
				id: startupId
			},
			data: {
				captable: captable
			}
		});

		const filteredStartup = excludeFields(startup, ['id']);
		return filteredStartup;
	} catch (error) {
		throw error;
	}
}

async function getCaptable(startupId) {
	try {
		const captable = await prisma.startup.findUnique({
			where: {
				id: startupId
			},
			select: {
				companyName: true,
				captable: true
			}
		});

		return captable;
	} catch (error) {
		throw error;
	}
}

// ---------- Utility Functions ----------

async function NotifyInvestors(startupId) {
	try {
		const investorsList = await getInvestors(startupId);

		if (!investorsList) {
			return null;
		}

		const companyName = investorsList.companyName;
		for (const investor of investorsList.investors) {
			const name = investor.name;
			const email = investor.email;

			await newUpdateNotification(companyName, name, email);
		}

		return investorsList;
	} catch (error) {
		throw error;
	}
}

export {
	createStartup,
	findStartupByUserId,
	findStartupById,
	investedStartupsbyInvestorId,
	addNewInvestor,
	getInvestors,
	NotifyInvestors,
	updateCodatId,
	updateCaptable,
	getCaptable
};
