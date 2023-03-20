import { createLogger, format, transports } from 'winston';

const logger = createLogger({
	transports: [
		new transports.File({
			filename: 'errors.log',
			level: 'error',
			format: format.combine(format.timestamp(), format.json()),
		}),
	],
});

function errorLogger(error) {
	if (error instanceof Error) {
		const errorMessage = `${error.message} ----- Cause: ${error.cause} ----- Stack ${error.stack}`;
		logger.log('error', errorMessage);
	}
}

export { logger, errorLogger };
