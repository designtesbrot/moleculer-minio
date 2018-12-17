const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('fGetObject', () => {
			it('accepts a bucket name, an object name and a file path', () => {
				let context = {
					client: {
						fGetObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const filePath = '/tmp/file.png';
				return Service().actions.fGetObject.handler.bind(context)({params: {bucketName, objectName, filePath}}).then(r => {
					expect(context.client.fGetObject.mock.calls[0]).toEqual([bucketName, objectName, filePath]);
				});
			});
		});
	});
});
