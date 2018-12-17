const {MoleculerError} = require("moleculer/src/errors");

/**
 * Error that should be thrown when the Minio Service can not be Initialized
 *
 * @class MinioInitializationError
 * @extends {MoleculerError}
 */
module.exports = class MinioInitializationError extends MoleculerError {
	/**
	 * Creates an instance of MinioInitializationError.
	 *
	 * @param {String?} message
	 * @param {Number?} code
	 * @param {String?} type
	 * @param {any} data
	 *
	 * @memberof MinioInitializationError
	 */
	constructor(
		message = "Minio can not be initialized", code = 500,
		type = "MINIO_INITIALIZATION_ERROR", data = {}) {
		super(message);
		this.code = code;
		this.type = type;
		this.data = data;
	}
};
