//API Version
const API_VERSION = 'v1';

import * as dotenv from 'dotenv';
import express from 'express';

const { default: authRouter } = await import(
	`./${API_VERSION}/routers/auth/auth.routes.mjs`
);
const { default: investorRouter } = await import(
	`./${API_VERSION}/routers/Investors/investors.routes.mjs`
);
const { default: startupRouter } = await import(
	`./${API_VERSION}/routers/Startups/startups.routes.mjs`
);
const { default: postRouter } = await import(
	`./${API_VERSION}/routers/Posts/posts.routes.mjs`
);

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	next();
});

//Routes
app.use(`/api/${API_VERSION}/auth`, authRouter);
app.use(`/api/${API_VERSION}/investor`, investorRouter);
app.use(`/api/${API_VERSION}/startup`, startupRouter);
app.use(`/api/${API_VERSION}/posts`, postRouter);

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

export default app;
