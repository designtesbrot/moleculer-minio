const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('getPartialObject', () => {
			it('accepts a bucket name, an object name, an offest and a length', () => {
				let context = {
					client: {
						getPartialObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const offset = 0;
				const length = 100;
				return Service().actions.getPartialObject.handler.bind(context)({params: {bucketName, objectName, offset, length}}).then(r => {
					expect(context.client.getPartialObject.mock.calls[0]).toEqual([bucketName, objectName, offset, length]);
				});
			});
		});
	});
});
