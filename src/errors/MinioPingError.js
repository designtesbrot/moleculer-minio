const {MoleculerRetryableError} = require("moleculer/src/errors");

/**
 * Error that should be thrown when the Minio Backend can not be pinged
 *
 * @class MinioPingError
 * @extends {MoleculerRetryableError}
 */
module.exports = class MinioPingError extends MoleculerRetryableError {
	/**
	 * Creates an instance of MinioPingError.
	 *
	 * @param {String?} message
	 * @param {Number?} code
	 * @param {String?} type
	 * @param {any} data
	 *
	 * @memberof MinioPingError
	 */
	constructor(
		message = "Minio Backend not reachable", code = 502,
		type = "MINIO_PING_ERROR", data = {}) {
		super(message);
		this.code = code;
		this.type = type;
		this.data = data;
	}
};
