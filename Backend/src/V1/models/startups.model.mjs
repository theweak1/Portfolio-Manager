import prisma from '../../database/index.mjs';

import { excludeFields } from '../util/helpers.mjs';
import { HttpError } from './http-error.mjs';

import { getBalanceSheet } from '../services/codat.service.mjs';
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
			'id',
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
		throw error;
	}
}

async function findUnApprovedStartups() {
	try {
		const startups = await prisma.startup.findMany({
			where: {
				user: {
					isApproved: false
				}
			}
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
				id: id
			},
			data: {
				companyName: !!startupInfo.companyName
					? startupInfo.companyName
					: undefined,
				email: !!email ? email : undefined,
				lastModified: new Date()
			}
		});

		const startupWithoutId = excludeFields(updatedStartup, ['id']);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function validateStartupExistsByUserId(userId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				userId: userId
			}
		});
		if (!startup) {
			return new HttpError('This startup does not exist in the system.', 401);
			// return buildErrorObject(
			// 	401,
			// 	'This startup does not exist in the system.'
			// );
		}

		return startup;
	} catch (error) {
		throw error;
	}
}

async function validateStartupExistsByStartupId(startupId) {
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
				codatId: true,
				blog: true
			}
			// include: {
			// 	posts: true,
			// },
		});

		if (!startups.length) {
			return null;
		}
		// TODO: Need to work with this code
		// loop through startups and get transactions for each one
		const startupsWithTransactions = await Promise.all(
			startups.map(async (startup) => {
				const connectionIds = await getConnections(startup.codatId);
				return {
					...startup,
					ids: connectionIds.results.map((result) => result.id)
				};
			})
		);
		console.log(startupsWithTransactions);
		// console.log(startupsWithTransactions);
		const filteredStartups = startupsWithTransactions.map((s) =>
			excludeFields(s, ['investorIds', 'userId', 'ids'])

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

async function updateInvestorsList(startupId, investorInfo) {
	try {
		// Fetch the current investors for the startup
		const currentInvestors = await prisma.startup.findUnique({
			where: { id: startupId },
			select: { investors: { select: { id: true } } }
		});

		const currentInvestorIds = currentInvestors.investors.map(
			(investor) => investor.id
		);

		// Find new investors to connect
		const newInvestorIds = investorInfo
			.filter((investor) => !currentInvestorIds.includes(investor.id))
			.map((investor) => investor.id);

		// Find existing investors to disconnect
		const disconnectInvestorIds = currentInvestorIds.filter((investorId) => {
			const investor = investorInfo.find((inv) => inv.id === investorId);
			return !investor;
		});

		// Disconnect the filtered investors
		const disconnectResult = await prisma.startup.update({
			where: { id: startupId },
			data: {
				investors: { disconnect: disconnectInvestorIds.map((id) => ({ id })) }
			}
		});

		// Connect new investors
		const connectResult = await prisma.startup.update({
			where: { id: startupId },
			data: {
				investors: {
					connect: newInvestorIds.map((id) => ({ id }))
				}
			}
		});

		const investorList = await prisma.startup.findUnique({
			where: { id: startupId }
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
			select: {
				companyName: true,
				investors: {
					select: {
						email: true,
						name: true
					}
				}
			}
		});

		return startup;
	} catch (error) {
		throw error;
	}
}

async function getStartupByIdAndInvestorId(startupId, investorId) {
	try {
		const startup = await prisma.startup.findUnique({
			where: {
				id: startupId
			},
			include: {
				investors: {
					where: {
						id: investorId
					}
				},
				blog: {
					select: {
						lastModified: true,
						title: true,
						description: true
					}
				}
			}
		});

		if (!startup) {
			return null;
		}

		const filteredStartup = excludeFields(startup, [
			'investors',
			'userId',
			'investorIds'
		]);
		return filteredStartup;
	} catch (error) {
		throw error;
	}
}

async function deleteStartup(startupId) {
	try {
		const startup = await validateStartupExistsByStartupId(startupId);

		if (!startup) {
			return new HttpError('Could not find startup for this id', 404);
			// return handleNotFoundResponse('Could not find startup for this id', res);
		}

		const deletedStartup = await prisma.startup.delete({
			where: {
				id: startupId
			}
		});

		return deletedStartup;
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
				codatId: companyId
			}
		});

		const startupWithoutId = excludeFields(updatedStartup, ['id']);
		return startupWithoutId;
	} catch (error) {
		throw error;
	}
}

async function getAllStartups() {
	try {
		const startups = await prisma.startup.findMany({
			select: {
				id: true,
				companyName: true,
				email: true
			}
		});
		if (!startups.length) {
			return null;
		}
		return startups;
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
	findUnApprovedStartups,
	validateStartupExistsByUserId,
	updateStartup,
	findStartupById,
	investedStartupsbyInvestorId,
	addNewInvestor,
	updateInvestorsList,
	getInvestors,
	getStartupByIdAndInvestorId,
	validateStartupExistsByStartupId,
	NotifyInvestors,
	deleteStartup,
	updateCodatId,
	getAllStartups
};
