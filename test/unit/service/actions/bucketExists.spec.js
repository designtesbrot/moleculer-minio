const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('bucketExists', () => {
			it('checks if the bucket exists', () => {
				let context = {
					client: {
						bucketExists: jest.fn().mockReturnValue(Promise.resolve(true))
					},
					Promise
				};
				const bucketName = 'someBucket';
				return Service().actions.bucketExists.handler.bind(context)({params: {bucketName}}).then(r => {
					expect(r).toEqual(true);
					expect(context.client.bucketExists.mock.calls[0]).toEqual([bucketName]);
				});
			});
		});
	});
});
