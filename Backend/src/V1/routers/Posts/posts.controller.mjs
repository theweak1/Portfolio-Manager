import {
	CreatePost,
	DeletePost,
	getPosts,
	StartupsWithPosts
} from '../../models/posts.model.mjs';

import { findInvestorByUserId } from '../../models/investors.model.mjs';

import {
	findStartupByUserId,
	NotifyInvestors
} from '../../models/startups.model.mjs';

import { handleErrorResponse, HttpError } from '../../models/http-error.mjs';

async function httpGetAllPost(req, res, next) {
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

		const startupsResponse = await StartupsWithPosts(investorResponse.id);

		if (!startupsResponse) {
			const error = new HttpError(
				'You are not invited to view any startups portfolio.',
				404
			);
			return next(error);
		}

		return res.status(200).json(startupsResponse);
	} catch (error) {
		return handleErrorResponse('get all posts by investor id', error, res);
	}
}

async function httpCreatePost(req, res, next) {
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

		const postInfo = {
			title: req.body.title,
			description: req.body.description
		};

		const postResponse = await CreatePost(startupResponse.id, postInfo);

		const notifyResponse = await NotifyInvestors(startupResponse.id);

		if (!notifyResponse) {
			const error = new HttpError(
				'There are no investors to notify of new post.',
				404
			);
			return next(error);
		}

		res.status(200).json({ post: postResponse, investors: notifyResponse });
	} catch (error) {
		return handleErrorResponse('Create post', error, res);
	}
}

async function httpGetMyPost(req, res, next) {
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

		const postsResponse = await getPosts(startupResponse.id);

		return res.status(200).json(postsResponse);
	} catch (error) {
		return handleErrorResponse('get all posts by investor id', error, res);
	}
}

async function httpDeletePost(req, res, next) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);

		if (!startupResponse) {
			const error = new HttpError('This startup does not exist in the system.');
			return next(error);
		}

		const postId = req.params.postId;

		const postResponse = await DeletePost(startupResponse.id, postId);

		res.status(200).json(postResponse);
	} catch (error) {
		return handleErrorResponse('delete specific post', error, res);
	}
}

export { httpGetAllPost, httpCreatePost, httpDeletePost, httpGetMyPost };
