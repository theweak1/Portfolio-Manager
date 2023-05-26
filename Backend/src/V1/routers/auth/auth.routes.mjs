//third party module imports
import express from 'express';

//Own file imports
import { authenticateJsonWebToken } from '../../services/auth.service.mjs';
import {
	httpForgotPassword,
	httpLogin,
	httpLogout,
	httpRefreshToken,
	httpResetPassword,
	httpSignupInvestor,
	httpSignupStartup
} from './auth.controller.mjs';

const router = express.Router();

router.post('/refreshToken', httpRefreshToken);

router.post('/login', httpLogin);

router.post('/logout', authenticateJsonWebToken, httpLogout);

router.post('/signup/investor', httpSignupInvestor);

router.post('/signup/startup', httpSignupStartup);

router.post('/forgotPassword', httpForgotPassword);

router.post('/resetPassword', authenticateJsonWebToken, httpResetPassword);

export default router;
