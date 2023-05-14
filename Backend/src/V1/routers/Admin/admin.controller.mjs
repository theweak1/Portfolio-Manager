import {
	deleteStartup,
	findStartupById,
	findUnApprovedStartups,
	getAllStartups,
	updateCodatId
} from '../../models/startups.model.mjs';

import { updateUserApproval } from '../../models/users.model.mjs';

import { HttpError, handleErrorResponse } from '../../models/http-error.mjs';
import { isValidUUID } from '../../util/helpers.mjs';

import { sendApprovedStartupAccessEmail } from '../../services/mail.service.mjs';

import { createCompany, deleteCompany } from '../../services/codat.service.mjs';

async function httpGetUnApprovedStartups(req, res, next) {
	try {
		const startups = await findUnApprovedStartups();
		return res.status(200).json(startups);
	} catch (err) {
		const error = new HttpError('get unapproved startups', 500);
		return next(error);
		// return handleErrorResponse('get unapproved startups', error, res);
	}
}

async function httpApproveStartupAccess(req, res, next) {
	try {
		const startupId = req.body.startupId;

		const isValid = await isValidUUID(startupId);
		if (!isValid) {
			const error = new HttpError(
				'This Id passed in the request does not have a valid format.',
				400
			);
			return next(error);

			// return handleBadRequestResponse(
			// 	'This Id passed in the request does not have a valid format.',
			// 	res
			// );
		}

		const startup = await findStartupById(startupId);
		if (!startup) {
			const error = new HttpError(
				'No startup exists with the provided Id.',
				404
			);
			return next(error);
			// return handleNotFoundResponse(
			// 	'No startup exists with the provided Id.',
			// 	res
			// );
		}

		const codatResponse = await createCompany(startup.companyName);
		// TODO: Uncomment line below to send a notification to startup that the were accepted in the application
		// await sendApprovedStartupAccessEmail(startup.email);
		await updateCodatId(startupId, codatResponse.id);

		const updatedUser = await updateUserApproval(startup.userId, true);
		return res.status(200).json({
			updatedUser,
			codatRedirect: {
				companyId: codatResponse.id,
				redirectLink: codatResponse.redirect
			}
		});
	} catch (error) {
		return handleErrorResponse('approve startup access', error, res);
	}
}

async function httpDeleteStartup(req, res, next) {
	try {
		const startupId = req.body.startupId;

		const startup = await findStartupById(startupId);
		if (!startup) {
			const error = new HttpError(
				'No startup exists with the provided Id.',
				404
			);
			return next(error);
			// return handleNotFoundResponse('No startup exists with the provided Id.',
			// 	res
			// );
		}
		// Delete startup from codat Companies service
		await deleteCompany(startup.codatId);
		const deletedStartup = await deleteStartup(startup.id);
		res.status(200).json(deletedStartup);
	} catch (error) {
		return handleErrorResponse('delete startup by startup id', error, res);
	}
}

async function httpGetAllStartups(req, res, next) {
	try {
		const startups = await getAllStartups();
		if (!startups) {
			const error = new HttpError('There are no startups in the system.', 404);
			return next(error);
			// return handleNotFoundResponse(
			// 	'There are no startups in the system.',
			// 	res
			// );
		}
		res.status(200).json(startups);
	} catch (error) {
		return handleErrorResponse('get all startups', error, res);
	}
}

export {
	httpGetUnApprovedStartups,
	httpApproveStartupAccess,
	httpDeleteStartup,
	httpGetAllStartups
};
