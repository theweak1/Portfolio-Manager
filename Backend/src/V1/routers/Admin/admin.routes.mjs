import express from 'express';

import {
	authenticateJsonWebToken,
	validateUserAccess,
} from '../../services/auth.service.mjs';

import {
	httpApproveStartupAccess,
	httpDeleteStartup,
	httpGetAllStartups,
	httpGetUnApprovedStartups,
} from './admin.controller.mjs';

const router = express.Router();

const startupPath = '/startup';

router.get('/', authenticateJsonWebToken, validateUserAccess, (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

router.get(
	`${startupPath}`,
	authenticateJsonWebToken,
	validateUserAccess,
	httpGetAllStartups
);

router.get(
	`${startupPath}/unapproved`,
	authenticateJsonWebToken,
	validateUserAccess,
	httpGetUnApprovedStartups
);

router.post(
	`${startupPath}/approve-startup`,
	authenticateJsonWebToken,
	validateUserAccess,
	httpApproveStartupAccess
);

router.delete(
	`${startupPath}`,
	authenticateJsonWebToken,
	validateUserAccess,
	httpDeleteStartup
);

export default router;
