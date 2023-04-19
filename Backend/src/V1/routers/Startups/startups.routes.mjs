import express from 'express';

import {
	authenticateJsonWebToken,
	validateUserAccess,
} from '../../services/auth.service.mjs';

import {
	httpApproveStartupAccess,
	httpDeleteStartup,
	httpGetInvestors,
	httpGetSpecificStartupProfile,
	httpGetStartupProfileByUserId,
	httpGetStartupsByInvestorId,
	httpGetUnApprovedStartups,
	httpNewInvestors,
	httpUpdateInvestor,
	httpUpdateStartupProfile,
} from './startups.controller.mjs';

const router = express.Router();

router.get('/', authenticateJsonWebToken, httpGetStartupsByInvestorId);

// TODO: need to create and admin acount to test this route
router.get(
	'/unapproved',
	authenticateJsonWebToken,
	validateUserAccess,
	httpGetUnApprovedStartups
);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get(
	'/:startupId',
	authenticateJsonWebToken,
	httpGetSpecificStartupProfile
);

router.delete(
	'/',
	authenticateJsonWebToken,
	validateUserAccess,
	httpDeleteStartup
);

router.post('/', authenticateJsonWebToken, httpUpdateStartupProfile);

// TODO: need to create and admin acount to test this route
router.post(
	'/approve-startup',
	authenticateJsonWebToken,
	validateUserAccess,
	httpApproveStartupAccess
);

router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

router.put('/investors', authenticateJsonWebToken, httpUpdateInvestor);

export default router;
