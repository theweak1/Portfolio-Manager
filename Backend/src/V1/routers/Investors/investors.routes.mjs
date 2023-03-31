import express from 'express';

import { authenticateJsonWebToken } from '../../services/auth.service.mjs';

import {
	httpGetInvestorProfileByUserId,
	httpUpdateInvestorProfile,
} from './investors.controller.mjs';

const router = express.Router();

router.get(
	'/profile',
	authenticateJsonWebToken,
	httpGetInvestorProfileByUserId
);

router.post('/', authenticateJsonWebToken, httpUpdateInvestorProfile);

export default router;
