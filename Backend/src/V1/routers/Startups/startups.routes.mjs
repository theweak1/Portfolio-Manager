import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	HttpGetCaptable,
	HttpPostCaptable,
	httpGetInvestors,
	httpGetKPI,
	httpGetPL,
	httpGetStartupProfileByUserId,
	httpGetStartupsByInvestorId,
	httpNewInvestors
} from './startups.controller.mjs';

const router = express.Router();
// stay
router.get('/', authenticateJsonWebToken, httpGetStartupsByInvestorId);
// stay
router.get('/investors', authenticateJsonWebToken, httpGetInvestors);
// stay
router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);
// stay
router.get('/kpi/:startupId', authenticateJsonWebToken, httpGetKPI);
// stay
router.get('/pl/:startupId', authenticateJsonWebToken, httpGetPL);
// stay
router.get('/captable/:startupId', authenticateJsonWebToken, HttpGetCaptable);
// stay
router.post('/captable', authenticateJsonWebToken, HttpPostCaptable);

// stay
router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

export default router;
