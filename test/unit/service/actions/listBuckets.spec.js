const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('listBuckets', () => {
			it('returns an empty string if there are no buckest', () => {
				let context = {
					client: {
						listBuckets: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				return Service().actions.listBuckets.handler.bind(context)().then(r => {
					expect(r).toEqual([]);
				});
			});

			it('uses an empty string as the default region', () => {
				let context = {
					client: {
						listBuckets: jest.fn().mockReturnValue(Promise.resolve(['foo']))
					},
					Promise
				};
				return Service().actions.listBuckets.handler.bind(context)().then(r => {
					expect(r).toEqual(['foo']);
				});
			});
		});
	});
});
