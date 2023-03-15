import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.get('/', (req, res) => {
	res.send('<h1>Hello from the server!!</h1>');
});

app.listen(PORT, (err) => {
	console.log(`Listening on ${PORT}...`);
});
