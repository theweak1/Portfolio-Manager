//third party module imports
import express from 'express';
/*
TODO: need to develop investors endpoint

 */
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

export default router;
