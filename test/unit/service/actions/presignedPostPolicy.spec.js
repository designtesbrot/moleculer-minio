const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('presigedUrl', () => {
			it('creates and returns a Presigned URL for performing an Operation', () => {
				let postPolicy = {
					setExpires: jest.fn(),
					setKey: jest.fn(),
					setKeyStartsWith: jest.fn(),
					setBucket: jest.fn(),
					setContentType: jest.fn(),
					setContentLengthRange: jest.fn()
				};
				let context = {
					client: {
						presignedPostPolicy: jest.fn().mockReturnValue({foo: 'bar'}),
						newPostPolicy: jest.fn().mockReturnValue(postPolicy)
					},
					Promise
				};
				const policy = {
					expires: 'Mon, 01 Jan 2018 00:00:00 GMT',
					key: 'some-key',
					keyStartsWith: 'some-start',
					bucket: 'some-bucket',
					contentType: 'some-content',
					contentLengthRangeMin: 535,
					contentLengthRangeMax: 34084
				};
				return Service().actions.presignedPostPolicy.handler.bind(context)({
					params: {policy}
				}).then(r => {
					expect(postPolicy.setExpires.mock.calls[0]).toEqual([new Date(policy.expires)]);
					expect(postPolicy.setKey.mock.calls[0]).toEqual([policy.key]);
					expect(postPolicy.setKeyStartsWith.mock.calls[0]).toEqual([policy.keyStartsWith]);
					expect(postPolicy.setBucket.mock.calls[0]).toEqual([policy.bucket]);
					expect(postPolicy.setContentType.mock.calls[0]).toEqual([policy.contentType]);
					expect(postPolicy.setContentLengthRange.mock.calls[0]).toEqual([policy.contentLengthRangeMin, policy.contentLengthRangeMax]);
					expect(r).toEqual({foo: 'bar'});
				});
			});

			it('creates a PostPolicy with no privileges', () => {
				let postPolicy = {
				};
				let context = {
					client: {
						presignedPostPolicy: jest.fn().mockReturnValue({foo: 'bar'}),
						newPostPolicy: jest.fn().mockReturnValue(postPolicy)
					},
					Promise
				};
				const policy = {};
				return Service().actions.presignedPostPolicy.handler.bind(context)({
					params: {policy}
				}).then(r => {
					expect(r).toEqual({foo: 'bar'});
				});
			});
		});
	});
});
