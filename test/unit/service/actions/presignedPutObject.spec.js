const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('presigedUrl', () => {
			it('creates and returns a Presigned URL for creating an Object', () => {
				let context = {
					client: {
						presignedPutObject: jest.fn()
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				let creating = Service().actions.presignedPutObject.handler.bind(context)({
					params: {
						bucketName,
						objectName,
						expires,
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedPutObject.mock.calls[0][3](null, 'https://example.com'))
					.then(() => creating)
					.then(r => {
						expect(r).toEqual('https://example.com');
						expect(context.client.presignedPutObject.mock.calls[0][0]).toEqual(bucketName);
						expect(context.client.presignedPutObject.mock.calls[0][1]).toEqual(objectName);
						expect(context.client.presignedPutObject.mock.calls[0][2]).toEqual(expires);
					});
			});

			it('rejects with errors encountered', () => {
				let context = {
					client: {
						presignedPutObject: jest.fn()
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				let creating = Service().actions.presignedPutObject.handler.bind(context)({
					params: {
						bucketName,
						objectName,
						expires
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedPutObject.mock.calls[0][3](new Error('Something went wrong')))
					.then(() => creating)
					.catch(e => {
						expect(e.message).toEqual('Something went wrong');
						expect(context.client.presignedPutObject.mock.calls[0][0]).toEqual(bucketName);
						expect(context.client.presignedPutObject.mock.calls[0][1]).toEqual(objectName);
						expect(context.client.presignedPutObject.mock.calls[0][2]).toEqual(expires);
					});
			});
		});
	});
});
