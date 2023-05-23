import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	httpGetStartupProfileByUserId,
	httpUpdateStartupProfile,
	httpGetStartupsByInvestorId,
	httpNewInvestors,
	httpUpdateInvestor,
	httpGetInvestors,
	httpGetSpecificStartupProfile,
	HttpPostCaptable,
	httpGetPL,
	HttpGetCaptable,
	httpGetKPI
} from './startups.controller.mjs';

const router = express.Router();


router.get('/',  authenticateJsonWebToken, httpGetStartupsByInvestorId);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get('/kpi/:startupId',authenticateJsonWebToken, httpGetKPI)

router.get('/pl/:startupId',authenticateJsonWebToken, httpGetPL)

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
