import jwt from 'jsonwebtoken';
import { getUserTokens } from '../models/users.model.mjs';
import { buildErrorObject } from '../util/helpers.mjs';

async function authenticateJsonWebToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		const error = buildErrorObject(401, 'Your are not authenticated.');
		return res.status(error.errorCode).json({ error: error });
	}

	const userTokens = await getUserTokens(token);
	if (token !== userTokens?.accessToken || userTokens.isApproved == false) {
		const error = buildErrorObject(
			403,
			'Your are not authorized to access these resources.'
		);
		return res.status(error.errorCode).json({ error: error });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user) => {
		if (err) {
			const error = buildErrorObject(
				403,
				'Your are not authorized to access these resources.'
			);
			return res.status(error.errorCode).json({ error: error });
		}

		const userId = user;
		req.userId = userId.id;
		next();
	});
}

function generateAccessToken(id) {
	const user = { id };
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '', {
		expiresIn: '5h',
	});
}

function generateRefreshToken(id) {
	const user = { id };
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '', {
		expiresIn: '2h',
	});
}

function verifyRefreshToken(refreshToken) {
	let accessToken = '';
	let refreshedToken = '';

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET || '',
		(err, user) => {
			if (err) {
				return buildErrorObject(403, 'Token has expired.');
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
	getUserIdFromToken,
};
