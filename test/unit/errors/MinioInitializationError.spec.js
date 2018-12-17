const {MinioInitializationError} = require("errors");

describe("Errors", () => {
	describe("MinioInitializationError", () => {
		describe("constructor", () => {
			it("constructs with sensitive defaults", () => {
				let error = new MinioInitializationError();
				expect(error.message).toEqual("Minio can not be initialized");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("MINIO_INITIALIZATION_ERROR");
				expect(error.data).toEqual({});
				expect(error.retryable).toEqual(false);
			});

			it("constructs with given arguments", () => {
				let error = new MinioInitializationError("foo", 500, "BAR",
					{fooz: "barz"});
				expect(error.message).toEqual("foo");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("BAR");
				expect(error.data).toEqual({fooz: "barz"});
				expect(error.retryable).toEqual(false);
			});
		});
	});
});
