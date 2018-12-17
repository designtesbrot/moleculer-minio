const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('fPutObject', () => {
			it('accepts a bucket name, an object name and a file path', () => {
				let context = {
					client: {
						fPutObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const filePath = '/var/tmp.png';
				const metaData = {foo: 'bar'};
				return Service().actions.fPutObject.handler.bind(context)({params: {filePath, bucketName, objectName, metaData}}).then(r => {
					expect(context.client.fPutObject.mock.calls[0]).toEqual([bucketName, objectName, filePath, metaData]);
				});
			});
		});
	});
});
