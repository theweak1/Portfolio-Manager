import jwt from 'jsonwebtoken';
import { findUserById, getUserTokens } from '../models/users.model.mjs';

import { HttpError } from '../models/http-error.mjs';

async function authenticateJsonWebToken(req, res, next) {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		{
			const authHeader = req.headers['authorization'];
			const token = authHeader && authHeader.split(' ')[1];

			if (!token) {
				const error = new HttpError('Your are not authenticated.', 401);
				return next(error);
				// return res.status(error.errorCode).json({ error: error });
			}

			const userTokens = await getUserTokens(token);
			if (token !== userTokens?.accessToken) {
				const error = new HttpError(
					'Your are not authorized to access these resources.',
					403
				);
				return next(error);
				// return res.status(error.errorCode).json({ error: error });
			}

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user) => {
				if (err) {
					const error = new HttpError(
						'Your are not authorized to access these resources.',
						403
					);
					return next(error);
					// return res.status(error.errorCode).json({ error: error });
				}

				const userId = user;
				req.userId = userId.id;
				next();
			});
		}
	} catch (err) {
		const error = new HttpError('Authentication failed!', 403);
		return next(error);
	}
}

// TODO: Replace expiration time with 1200s after finish development
function generateAccessToken(id) {
	const user = { id };
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '', {
		expiresIn: '5h'
	});
}

function generateRefreshToken(id) {
	const user = { id };
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '', {
		expiresIn: '2h'
	});
}

function verifyRefreshToken(refreshToken, next) {
	let accessToken = '';
	let refreshedToken = '';

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET || '',
		(err, user) => {
			if (err) {
				const error = new HttpError('Token has expired.', 403);
				return next(error);
				// return buildErrorObject(403, 'Token has expired.');
			}

			const userId = user;
			accessToken = generateAccessToken(userId.id);
			refreshedToken = generateRefreshToken(userId.id);
		}
	);

	return [accessToken, refreshedToken];
}

function getUserIdFromToken(token) {
	const decodedToken = jwt.decode(token, { complete: true });

	if (!decodedToken) {
		return '';
	}

	const user = decodedToken.payload;
	return user.id;
}

export {
	authenticateJsonWebToken,
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
	getUserIdFromToken
};
