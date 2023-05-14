import { errorLogger } from '../util/logger.mjs';

class HttpError extends Error {
	constructor(message, errorCode) {
		super(message); // Add a "message" property
		this.code = errorCode; // Adds a "code" property
	}
}

function handleErrorResponse(failedAt, err, res) {
	errorLogger(err);
	const error = new HttpError(
		`The resquest to ${failedAt} failed. Please report this to Tech Support for further investigation.`,
		500
	);

	return res.status(error.code).json({ error: error.message });
}
export { HttpError, handleErrorResponse };
