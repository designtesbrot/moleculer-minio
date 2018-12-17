const Service = () => require('service');
describe('Service', () => {
	describe('created', () => {
		it('constructs a new mini client', () => {
			let context = {
				createMinioClient: jest.fn().mockReturnValue({foo: 'bar'})
			};
			let service = Service();
			service.created.bind(context)();
			expect(context.client).toEqual({foo: 'bar'});
		});
	});
});
