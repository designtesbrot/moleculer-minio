const Service = require('service');
describe('Service', () => {
	describe('settings', () => {
		it('uses sensitive defaults', () => {
			expect(Service.settings).toEqual({
				endpoint: undefined,
				port: undefined,
				useSSL: true,
				accessKey: undefined,
				secretKey: undefined,
				region: undefined,
				transport: undefined,
				sessionToken: undefined,
				minioHealthCheckInterval: 5000
			});
		});
	});
});
