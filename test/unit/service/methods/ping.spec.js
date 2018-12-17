const Service = require('service');
const Promise = require('bluebird');

describe('Service', () => {
	describe('methods', () => {
		describe('ping', () => {
			it('resolves if the backend is reachable', () => {
				let context = {
					client: {
						listBuckets: jest.fn().mockReturnValue(Promise.resolve())
					},
					Promise
				};
				return Service.methods.ping.bind(context)({timeout: 10}).then(result => {
					expect(result).toEqual(true);
				});
			});

			it('rejects if the backend is not reachable', () => {
				let context = {
					client: {
						listBuckets: jest.fn().mockReturnValue(Promise.delay(1000))
					},
					Promise
				};
				return Service.methods.ping.bind(context)({timeout: 10}).catch(e => {
					expect(e.constructor.name).toEqual('MinioPingError');
				});
			});
		});
	});
});
