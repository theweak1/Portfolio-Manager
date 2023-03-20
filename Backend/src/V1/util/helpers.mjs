import { errorLogger } from './logger.mjs';

function titleCase(str) {
	if (!str) {
		return '';
	}

	return str
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
}

function isValidUUID(str) {
	const regexExp = /^[0-9a-fA-F]{24}$/gi;
	return regexExp.test(str);
}

function excludeFields(record, keys) {
	for (let key of keys) {
		delete record[key];
	}
	return record;
}

function handleErrorResponse(failedAt, error, res) {
	errorLogger(error);
	const errorResponse = {
		errorCode: 500,
		errorMessage: `The resquest to ${failedAt} failed. Please report this to Tech Support for further investigation.`,
	};
	return res.status(errorResponse.errorCode).json({
		error: errorResponse,
	});
}

function handleBadRequestResponse(message, res) {
	const errorResponse = {
		errorCode: 400,
		errorMessage: message,
	};
	return res.status(errorResponse.errorCode).json({ error: errorResponse });
}

function handleNotFoundResponse(message, res) {
	const errorResponse = {
		errorCode: 404,
		errorMessage: message,
	};
	return res.status(errorResponse.errorCode).json({ error: errorResponse });
}

function buildErrorObject(code, message) {
	const error = {
		errorCode: code,
		errorMessage: message,
	};
	return error;
}

export {
	titleCase,
	isValidUUID,
	excludeFields,
	handleErrorResponse,
	handleBadRequestResponse,
	handleNotFoundResponse,
	buildErrorObject,
};
