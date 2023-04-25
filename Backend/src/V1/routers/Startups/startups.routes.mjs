import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	httpGetInvestors,
	httpGetSpecificStartupProfile,
	httpGetStartupProfileByUserId,
	httpGetStartupsByInvestorId,
	httpNewInvestors,
	httpUpdateInvestor,
	httpUpdateStartupProfile,
} from './startups.controller.mjs';

const router = express.Router();

router.get('/', authenticateJsonWebToken, httpGetStartupsByInvestorId);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get(
	'/:startupId',
	authenticateJsonWebToken,
	httpGetSpecificStartupProfile
);

router.post('/', authenticateJsonWebToken, httpUpdateStartupProfile);

router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

router.put('/investors', authenticateJsonWebToken, httpUpdateInvestor);

export default router;
