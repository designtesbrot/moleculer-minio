const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('statObject', () => {
			it('accepts a bucket name and an object name', () => {
				let context = {
					client: {
						statObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				return Service().actions.statObject.handler.bind(context)({params: {bucketName, objectName}}).then(r => {
					expect(context.client.statObject.mock.calls[0]).toEqual([bucketName, objectName]);
				});
			});
		});
	});
});
