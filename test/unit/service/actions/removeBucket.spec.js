const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('removeBucket', () => {
			it('removes a Bucket', () => {
				let context = {
					client: {
						removeBucket: jest.fn().mockReturnValue(Promise.resolve(true))
					},
					Promise
				};
				const bucketName = 'someBucket';
				return Service().actions.removeBucket.handler.bind(context)({params: {bucketName}}).then(r => {
					expect(r).toEqual(true);
					expect(context.client.removeBucket.mock.calls[0]).toEqual([bucketName]);
				});
			});
		});
	});
});
