const {MinioPingError} = require("errors");

describe("Errors", () => {
	describe("MinioPingError", () => {
		describe("constructor", () => {
			it("constructs with sensitive defaults", () => {
				let error = new MinioPingError();
				expect(error.message).toEqual("Minio Backend not reachable");
				expect(error.code).toEqual(502);
				expect(error.type).toEqual("MINIO_PING_ERROR");
				expect(error.data).toEqual({});
				expect(error.retryable).toEqual(true);
			});

			it("constructs with given arguments", () => {
				let error = new MinioPingError("foo", 500, "BAR", {fooz: "barz"});
				expect(error.message).toEqual("foo");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("BAR");
				expect(error.data).toEqual({fooz: "barz"});
				expect(error.retryable).toEqual(true);
			});
		});
	});
});
