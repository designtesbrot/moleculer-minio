const Service = () => require("service");
const Promise = require("bluebird");
describe("Service", () => {
	describe("actions", () => {
		describe("copyObject", () => {
			it("accepts a bucket name, an object name, a sourceObject and conditions", () => {
				let context = {
					client: {
						copyObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = "some-bucket";
				const objectName = "some-object";
				const sourceObject = "/var/tmp.png";
				const conditions = {
					modified: "Mon, 01 Jan 2018 00:00:00 GMT",
					unmodified: "Tue, 01 Jan 2019 00:00:00 GMT",
					matchETag: "asdgdf",
					matchETagExcept: "asdgdf"
				};
				return Service().actions.copyObject.handler.bind(context)({params: {sourceObject, bucketName, objectName, conditions}}).then(r => {
					expect(context.client.copyObject.mock.calls[0][0]).toEqual(bucketName);
					expect(context.client.copyObject.mock.calls[0][1]).toEqual(objectName);
					expect(context.client.copyObject.mock.calls[0][2]).toEqual(sourceObject);
					expect(context.client.copyObject.mock.calls[0][3]).toEqual(conditions);
				});
			});

			it("works without any conditions", () => {
				let context = {
					client: {
						copyObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = "some-bucket";
				const objectName = "some-object";
				const sourceObject = "/var/tmp.png";
				const conditions = {};
				return Service().actions.copyObject.handler.bind(context)({params: {sourceObject, bucketName, objectName, conditions}}).then(r => {
					expect(context.client.copyObject.mock.calls[0][0]).toEqual(bucketName);
					expect(context.client.copyObject.mock.calls[0][1]).toEqual(objectName);
					expect(context.client.copyObject.mock.calls[0][2]).toEqual(sourceObject);
					expect(context.client.copyObject.mock.calls[0][3]).toEqual({
						matchETag: "",
						matchETagExcept: "",
						modified: "",
						unmodified: ""
					});
				});
			});
		});
	});
});
