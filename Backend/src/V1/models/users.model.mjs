import crypto from 'crypto';
import prisma from '../../database/index.mjs';

import { getUserIdFromToken } from '../services/auth.service.mjs';

import { excludeFields } from '../util/helpers.mjs';
import { HttpError } from './http-error.mjs';

async function createUser(email, password, role, isApproved) {
	try {
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return new HttpError(
				'Email is already taken, please provide another email address.',
				400
			);
			// return buildErrorObject(
			// 	400,
			// 	'Email is already taken, please provide another email address.'
			// );
		}
		let salt = generateSalt(32);
		let hashedPassword = sha512(password.toString(), salt);

		const createdUser = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
				passwordSalt: salt,
				role: role,
				isApproved: isApproved
			}
		});
		return createdUser;
	} catch (error) {
		throw error;
	}
}

async function updateUserEmail(user, email) {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				email: email,
				lastModified: new Date()
			}
		});

		return updatedUser;
	} catch (error) {
		throw error;
	}
}

async function isUserAuthorized(email, password) {
	try {
		const user = await findUserByEmail(email);
		if (!user) {
			return new HttpError("A user with this email doesn't exist.", 401);
			// return buildErrorObject(401, "A user with this email doesn't exist.");
		}

		let hashedPasswordFromRequest = sha512(password, user.passwordSalt);
		if (hashedPasswordFromRequest !== user.password) {
			return new HttpError(
				'Provided password is incorrect for this user.',
				401
			);
			// return buildErrorObject(
			// 	401,
			// 	'Provided password is incorrect for this user.'
			// );
		}

		

		const userWithoutPassord = excludeFields(user, [
			'password',
			'passwordSalt'
		]);
		return userWithoutPassord;
	} catch (error) {
		throw error;
	}
}

async function findUserById(userId) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		return user;
	} catch (error) {
		throw error;
	}
}

async function findEmailById(userId) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) {
			return null;
		}

		return excludeFields(user, [
			'id',
			'accessToken',
			'refreshToken',
			'password',
			'passwordSalt'
		]);
	} catch (error) {
		throw error;
	}
}

async function updateUserPassword(user, newPassword) {
	try {
		let salt = generateSalt(32);
		let hashedPassword = sha512(newPassword, salt);

		const updatedUser = await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: hashedPassword,
				passwordSalt: salt,
				lastModified: new Date()
			}
		});

		const userToReturn = excludeFields(updatedUser, [
			'id',
			'password',
			'passwordSalt',
			'accessToken',
			'refreshToken'
		]);
		return userToReturn;
	} catch (error) {
		throw error;
	}
}

async function findUserByEmail(email) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		});
		return user;
	} catch (error) {
		throw error;
	}
}

async function getUserTokens(token) {
	try {
		const userId = getUserIdFromToken(token);

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) return null;

		return user;
	} catch (error) {
		throw error;
	}
}

async function updateUserTokens(userId, accessToken, refreshToken) {
	try {
		const user = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				accessToken: accessToken,
				refreshToken: refreshToken
			}
		});

		const userFiltered = excludeFields(user, [
			'id',
			'password',
			'passwordSalt'
		]);
		return userFiltered;
	} catch (error) {
		throw error;
	}
}

async function updateUserApproval(userId, approval) {
	try {
		const user = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				isApproved: approval,
				lastModified: new Date()
			}
		});

		const userFiltered = excludeFields(user, [
			'id',
			'password',
			'passwordSalt',
			'accessToken',
			'refreshToken'
		]);
		return userFiltered;
	} catch (error) {
		throw error;
	}
}

// --- Utilities Functions ---
async function validateProfileUpdate(userInfo) {
	try {
		// Validate that User Exists
		const user = await prisma.user.findUnique({
			where: {
				id: userInfo.id
			}
		});
		if (!user) {
			return new HttpError('This user does not exist in the system.', 401);
			// return buildErrorObject(401, 'This user does not exist in the system.');
		}

		// Validate if Email Already Exists
		if (userInfo.email !== user.email && !!userInfo.email) {
			const userWithEmailExists = await findUserByEmail(userInfo.email);
			if (userWithEmailExists) {
				return new HttpError('A user with this email already exists.', 400);
				// return buildErrorObject(400, 'A user with this email already exists.');
			}
		}

		// Validate Passwords Match
		if (
			userInfo.password &&
			userInfo.newPassword &&
			userInfo.password !== userInfo.newPassword
		) {
			let hashedPasswordFromRequest = sha512(
				userInfo.password,
				user.passwordSalt
			);
			if (hashedPasswordFromRequest !== user.password) {
				return new HttpError('Current password is incorrect for this user,401');
				// return buildErrorObject(
				// 	401,
				// 	'Current password is incorrect for this user.'
				// );
			}
		}

		return user;
	} catch (error) {
		throw error;
	}
}

function generateSalt(length) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0.16);
}

function sha512(password, salt) {
	let HMAC = crypto.createHmac('sha256', salt);
	HMAC.update(password);
	let hashedPassword = HMAC.digest('hex');
	return hashedPassword;
}

export {
	createUser,
	findEmailById,
	findUserByEmail,
	findUserById,
	updateUserEmail,
	updateUserPassword,
	isUserAuthorized,
	getUserTokens,
	updateUserApproval,
	updateUserTokens,
	validateProfileUpdate
};
