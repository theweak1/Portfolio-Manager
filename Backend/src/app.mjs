import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import prisma from './database/index.mjs';
import authRouter from './V1/routers/auth/auth.routes.mjs';
import investorRouter from './V1/routers/Investor/investor.routes.mjs';

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
// TODO: Replace line below for startup
app.use('/api/v1/investor', investorRouter);

// try {
// 	prisma.$connect().then(() =>
// 		app.listen(PORT, () => {
// 			console.log(`listeing on port ${PORT}...`);
// 		})
// 	);
// } catch (error) {
// 	console.error(error.message);
// }

export default app;
