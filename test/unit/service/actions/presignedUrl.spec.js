const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('presigedUrl', () => {
			it('creates and returns a Presigned URL', () => {
				let context = {
					client: {
						presignedUrl: jest.fn()
					},
					Promise
				};
				const httpMethod = 'PATCH';
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				const reqParams = {foo: 'bar'};
				const requestDate = 'Mon, 01 Jan 2018 00:00:00 GMT';
				let creating = Service().actions.presignedUrl.handler.bind(context)({
					params: {
						httpMethod,
						bucketName,
						objectName,
						expires,
						reqParams,
						requestDate
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedUrl.mock.calls[0][6](null, 'https://example.com'))
					.then(() => creating)
					.then(r => {
						expect(r).toEqual('https://example.com');
						expect(context.client.presignedUrl.mock.calls[0][0]).toEqual(httpMethod);
						expect(context.client.presignedUrl.mock.calls[0][1]).toEqual(bucketName);
						expect(context.client.presignedUrl.mock.calls[0][2]).toEqual(objectName);
						expect(context.client.presignedUrl.mock.calls[0][3]).toEqual(expires);
						expect(context.client.presignedUrl.mock.calls[0][4]).toEqual(reqParams);
						expect(context.client.presignedUrl.mock.calls[0][5]).toEqual(new Date(requestDate));
					});
			});

			it('rejects with errors encountered', () => {
				let context = {
					client: {
						presignedUrl: jest.fn()
					},
					Promise
				};
				const httpMethod = 'PATCH';
				const bucketName = 'some-bucket';
				const objectName = 'some-object';
				const expires = 1535;
				const reqParams = {foo: 'bar'};
				let creating = Service().actions.presignedUrl.handler.bind(context)({
					params: {
						httpMethod,
						bucketName,
						objectName,
						expires,
						reqParams
					}
				});
				return Promise.delay(100)
					.then(() => context.client.presignedUrl.mock.calls[0][6](new Error('Something went wrong')))
					.then(() => creating)
					.catch(e => {
						expect(e.message).toEqual('Something went wrong');
						expect(context.client.presignedUrl.mock.calls[0][0]).toEqual(httpMethod);
						expect(context.client.presignedUrl.mock.calls[0][1]).toEqual(bucketName);
						expect(context.client.presignedUrl.mock.calls[0][2]).toEqual(objectName);
						expect(context.client.presignedUrl.mock.calls[0][3]).toEqual(expires);
						expect(context.client.presignedUrl.mock.calls[0][4]).toEqual(reqParams);
						expect(context.client.presignedUrl.mock.calls[0][5]).toEqual(undefined);
					});
			});
		});
	});
});
