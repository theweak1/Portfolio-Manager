import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	HttpGetCaptable,
	HttpPostCaptable,
	httpGetInvestors,
	httpGetSpecificStartupProfile,
	httpGetStartupProfileByUserId,
	httpGetStartupsByInvestorId,
	httpNewInvestors,
	httpUpdateInvestor,
	httpUpdateStartupProfile
} from './startups.controller.mjs';

const router = express.Router();

router.get('/',  authenticateJsonWebToken, httpGetStartupsByInvestorId);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get('/captable/:startupId', authenticateJsonWebToken, HttpGetCaptable);

router.post('/captable', authenticateJsonWebToken, HttpPostCaptable);

router.post('/', authenticateJsonWebToken, httpUpdateStartupProfile);

router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

router.put('/investors', authenticateJsonWebToken, httpUpdateInvestor);

// router.get(
// 	'/:startupId',
// 	authenticateJsonWebToken,
// 	httpGetSpecificStartupProfile
// );

export default router;
