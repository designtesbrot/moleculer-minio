const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('getObject', () => {
			it('accepts a bucket name and an object name', () => {
				let context = {
					client: {
						getObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				return Service().actions.getObject.handler.bind(context)({params: {bucketName, objectName}}).then(r => {
					expect(context.client.getObject.mock.calls[0]).toEqual([bucketName, objectName]);
				});
			});
		});
	});
});
