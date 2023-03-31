//API Version
const API_VERSION = 'v1';

import cors from 'cors';
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

dotenv.config();

const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

const app = express();
const allowedOrigins = [`${CLIENT_HOST}:${CLIENT_PORT}`];
const options = {
	origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/investor', investorRouter);

app.use('/api/v1/startup', startupRouter);

export default app;
