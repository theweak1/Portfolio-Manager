//third party module imports
import express from 'express';
/* 
TODO: Need to create Admin endpoints
-- Includes admin routes
-- Includes admin controllers

TODO: Push code to github dev branch
-- create pull request
*/
//Own file imports
import { authenticateJsonWebToken } from '../../services/auth.service.mjs';
import {
	httpForgotPassword,
	httpGetAdminProfile,
	httpLogin,
	httpLogout,
	httpRefreshToken,
	httpResetPassword,
	httpSignupAdmin,
	httpSignupInvestor,
	httpSignupStartup,
	httpUpdateAdmin,
} from './auth.controller.mjs';

const router = express.Router();

router.get('/admin/profile', authenticateJsonWebToken, httpGetAdminProfile);

router.post('/refreshToken', httpRefreshToken);

router.post('/login', httpLogin);

router.post('/logout', authenticateJsonWebToken, httpLogout);

router.post('/signup/investor', httpSignupInvestor);

router.post('/signup/startup', httpSignupStartup);

router.post('/signup/admin', httpSignupAdmin);

router.post('/admin/profile', authenticateJsonWebToken, httpUpdateAdmin);

router.post('/forgotPassword', httpForgotPassword);

router.post('/resetPassword', authenticateJsonWebToken, httpResetPassword);

export default router;
