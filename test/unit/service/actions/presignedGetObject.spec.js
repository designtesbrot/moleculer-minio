const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('presigedUrl', () => {
			it('creates and returns a Presigned URL for obtaining an Object', () => {
				let context = {
					client: {
						presignedGetObject: jest.fn()
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				const reqParams = {foo: 'bar'};
				const requestDate = 'Mon, 01 Jan 2018 00:00:00 GMT';
				let creating = Service().actions.presignedGetObject.handler.bind(context)({
					params: {
						bucketName,
						objectName,
						expires,
						reqParams,
						requestDate
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedGetObject.mock.calls[0][5](null, 'https://example.com'))
					.then(() => creating)
					.then(r => {
						expect(r).toEqual('https://example.com');
						expect(context.client.presignedGetObject.mock.calls[0][0]).toEqual(bucketName);
						expect(context.client.presignedGetObject.mock.calls[0][1]).toEqual(objectName);
						expect(context.client.presignedGetObject.mock.calls[0][2]).toEqual(expires);
						expect(context.client.presignedGetObject.mock.calls[0][3]).toEqual(reqParams);
						expect(context.client.presignedGetObject.mock.calls[0][4]).toEqual(new Date(requestDate));
					});
			});

			it('rejects with errors encountered', () => {
				let context = {
					client: {
						presignedGetObject: jest.fn()
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				const reqParams = {foo: 'bar'};
				let creating = Service().actions.presignedGetObject.handler.bind(context)({
					params: {
						bucketName,
						objectName,
						expires,
						reqParams
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedGetObject.mock.calls[0][5](new Error('Something went wrong')))
					.then(() => creating)
					.catch(e => {
						expect(e.message).toEqual('Something went wrong');
						expect(context.client.presignedGetObject.mock.calls[0][0]).toEqual(bucketName);
						expect(context.client.presignedGetObject.mock.calls[0][1]).toEqual(objectName);
						expect(context.client.presignedGetObject.mock.calls[0][2]).toEqual(expires);
						expect(context.client.presignedGetObject.mock.calls[0][3]).toEqual(reqParams);
						expect(context.client.presignedGetObject.mock.calls[0][4]).toEqual(undefined);
					});
			});
		});
	});
});
