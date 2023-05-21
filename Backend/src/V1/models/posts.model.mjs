import prisma from '../../database/index.mjs';

import { excludeFields } from '../util/helpers.mjs';
import { HttpError } from './http-error.mjs';

async function StartupsWithPosts(investorId) {
	try {
		const startups = await prisma.startup.findMany({
			where: {
				investors: {
					some: {
						id: investorId
					}
				}
			},
			include: {
				blog: {
					select: {
						id: true,
						lastModified: true,
						title: true,
						description: true
					}
				}
			}
		});

		if (!startups.length) {
			return null;
		}

		const filteredstartups = startups.map((s) =>
			excludeFields(s, [
				'investorIds',
				'userId',
				'createdDate',
				'lastModified',
				'email',
				'codatId',
				'redirectLink',
				'captable'
			])
		);
		return startups;
	} catch (error) {
		throw error;
	}
}

async function CreatePost(startupId, postInfo) {
	try {
		const createdPost = await prisma.post.create({
			data: {
				title: postInfo.title,
				description: postInfo.description,
				creator: {
					connect: {
						id: startupId
					}
				}
			}
		});

		return createdPost;
	} catch (error) {
		throw error;
	}
}

async function DeletePost(startupId, postId) {
	try {
		const postToDelete = await validatePostExistence(postId);

		if (!postToDelete) {
			return new HttpError('Could not find a post for this id', 404);
		}

		if (postToDelete.creatorId !== startupId) {
			return new HttpError('You are not authorized to delete this post', 401);
		}

		const deletedPost = await prisma.post.delete({
			where: {
				id: postId
			}
		});

		return deletedPost;
	} catch (error) {
		throw error;
	}
}

async function updatePost(startupId, postId, postInfo) {
	try {
		const postToUpdate = await validatePostExistence(postId);

		if (!postToUpdate) {
			return new HttpError('Could not find a post for this id', 404);
		}

		if (postToUpdate.creatorId !== startupId) {
			return new HttpError('You are not authorized to update this post', 401);
		}

		const UpdatedPost = await prisma.post.update({
			where: {
				id: postId
			},
			data: {
				title: postInfo.title,
				description: postInfo.description,
				lastModified: new Date()
			}
		});

		return UpdatedPost;
	} catch (error) {
		throw error;
	}
}

// --- Utilities Functions ---
async function validatePostExistence(postId) {
	const post = await prisma.post.findUnique({
		where: {
			id: postId
		},
		select: {
			creatorId: true
		}
	});
	return post;
}

export { StartupsWithPosts, CreatePost, DeletePost, updatePost };
