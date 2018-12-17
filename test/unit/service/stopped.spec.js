const Service = () => require('service');
describe('Service', () => {
	describe('stopped', () => {
		it('does nothing if there is no healthCheckInterval', () => {
			let context = {};
			let service = Service();
			expect(service.stopped.bind(context)()).toEqual(undefined);
		});

		it('stops the healthcheck interval', () => {
			let context = {
				healthCheckInterval: setInterval(() => {}, 10000)
			};
			expect(Service().stopped.bind(context)()).toEqual(undefined);
		});
	});
});
