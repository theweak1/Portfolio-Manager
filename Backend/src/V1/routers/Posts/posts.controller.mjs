import {
	CreatePost,
	DeletePost,
	StartupsWithPosts,
	updatePost,
} from '../../models/posts.model.mjs';

import { findInvestorByUserId } from '../../models/investors.model.mjs';

import {
	findStartupByUserId,
	NotifyInvestors,
} from '../../models/startups.model.mjs';
import {
	handleBadRequestResponse,
	handleErrorResponse,
	handleNotFoundResponse,
} from '../../util/helpers.mjs';

async function httpGetAllPost(req, res) {
	try {
		const userId = req.userId;

		const investorResponse = await findInvestorByUserId(userId);
		if (!investorResponse) {
			return handleBadRequestResponse(
				'This investor does not exist in the system.',
				res
			);
		}

		const startupsResponse = await StartupsWithPosts(investorResponse.id);

		if (!startupsResponse) {
			return handleNotFoundResponse(
				'You are not inveted to view any startups portfolio.',
				res
			);
		}

		return res.status(200).json(startupsResponse);
	} catch (error) {
		return handleErrorResponse('get all posts by investor id', error, res);
	}
}

async function httpCreatePost(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);

		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		const postInfo = {
			title: req.body.title,
			description: req.body.description,
		};

		const postResponse = await CreatePost(startupResponse.id, postInfo);

		const notifyResponse = await NotifyInvestors(startupResponse.id);

		if (!notifyResponse) {
			return handleNotFoundResponse(
				'There are no investors to notify of new post.',
				res
			);
		}

		res.status(200).json({ post: postResponse, investors: notifyResponse });
	} catch (error) {
		return handleErrorResponse('Create post', error, res);
	}
}

async function httpDeletePost(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);

		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		const postId = req.params.postId;

		const postResponse = await DeletePost(startupResponse.id, postId);

		res.status(200).json(postResponse);
	} catch (error) {
		return handleErrorResponse('delete specific post', error, res);
	}
}

async function httpUpdatePost(req, res) {
	try {
		const userId = req.userId;
		const startupResponse = await findStartupByUserId(userId);

		if (!startupResponse) {
			return handleBadRequestResponse(
				'This startup does not exist in the system.',
				res
			);
		}

		const postId = req.params.postId;
		const postInfo = {
			title: req.body.title,
			description: req.body.description,
		};
		const postResponse = await updatePost(startupResponse.id, postId, postInfo);

		res.status(200).json(postResponse);
	} catch (error) {
		return handleErrorResponse('update specific post', error, res);
	}
}

export { httpGetAllPost, httpCreatePost, httpDeletePost, httpUpdatePost };
