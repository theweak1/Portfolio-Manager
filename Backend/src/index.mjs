import http from 'http';
import app from './app.mjs';

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

server.listen(SERVER_PORT, () =>
	console.log(`Server is running ${SERVER_HOST}:${SERVER_PORT}`)
);
