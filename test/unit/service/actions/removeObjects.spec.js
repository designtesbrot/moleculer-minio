const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('removeObjects', () => {
			it('accepts a bucket name and an object name', () => {
				let context = {
					client: {
						removeObjects: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectNames = ['some-object'];
				return Service().actions.removeObjects.handler.bind(context)({params: {bucketName, objectNames}}).then(r => {
					expect(context.client.removeObjects.mock.calls[0]).toEqual([bucketName, objectNames]);
				});
			});
		});
	});
});
