const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('makeBucket', () => {
			it('accepts a bucket name and a region', () => {
				let context = {
					client: {
						makeBucket: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				const region = 'some-region';
				return Service().actions.makeBucket.handler.bind(context)({params: {bucketName, region}}).then(r => {
					expect(context.client.makeBucket.mock.calls[0]).toEqual([bucketName, region]);
				});
			});

			it('uses an empty string as the default region', () => {
				let context = {
					client: {
						makeBucket: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				const bucketName = 'some-bucket';
				return Service().actions.makeBucket.handler.bind(context)({params: {bucketName}}).then(r => {
					expect(context.client.makeBucket.mock.calls[0]).toEqual([bucketName, '']);
				});
			});
		});
	});
});
