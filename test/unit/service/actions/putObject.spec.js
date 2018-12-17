const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('putObject', () => {
			it('accepts a bucket name, an object name and a file path', () => {
				let context = {
					client: {
						putObject: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const size = 1535;
				const metaData = {foo: 'bar'};
				const stream = {fooz: 'barz'};
				return Service().actions.putObject.handler.bind(context)({params: stream, meta: {bucketName, objectName, size, metaData}}).then(r => {
					expect(context.client.putObject.mock.calls[0]).toEqual([bucketName, objectName, stream, size, metaData]);
				});
			});
		});
	});
});
