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

router.get('/', authenticateJsonWebToken, httpGetStartupsByInvestorId);

router.get('/investors', authenticateJsonWebToken, httpGetInvestors);

router.get('/profile', authenticateJsonWebToken, httpGetStartupProfileByUserId);

router.get('/kpi/:startupId', authenticateJsonWebToken, httpGetKPI);

router.get('/pl/:startupId', authenticateJsonWebToken, httpGetPL);

router.get('/captable/:startupId', authenticateJsonWebToken, HttpGetCaptable);

router.post('/captable', authenticateJsonWebToken, HttpPostCaptable);

router.post('/investors', authenticateJsonWebToken, httpNewInvestors);

export default router;
