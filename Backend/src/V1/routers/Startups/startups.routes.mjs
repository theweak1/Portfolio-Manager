import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	httpApproveStartupAccess,
	httpGetInvestors,
	httpGetStartupProfileByUserId,
	httpGetStartupsByInvestorId,
	httpGetUnApprovedStartups,
	httpNewInvestors,
	httpUpdateInvestor,
	httpUpdateStartupProfile,
} from './startups.controller.mjs';

const router = express.Router();

router.get('/', authenticateJsonWebToken, httpGetStartupsByInvestorId);
// router.get('/:startupId', authenticateJsonWebToken, httpUpdateStartupProfile);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get('/unapproved', authenticateJsonWebToken, httpGetUnApprovedStartups);

router.post('/', authenticateJsonWebToken, httpUpdateStartupProfile);

router.post(
	'/approve-startup',
	authenticateJsonWebToken,
	httpApproveStartupAccess
);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

router.put('/investors', authenticateJsonWebToken, httpUpdateInvestor);

export default router;
