const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('listObjectsV2', () => {
			it('lists all objects in a Bucket', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjectsV2: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				const startAfter = 'that';
				const listing = Service().actions.listObjectsV2.handler.bind(context)({params: {bucketName, prefix, recursive, startAfter}});
				return Promise.delay(100).then(() => {
					stream.on.mock.calls.find(e => e[0] === 'data')[1]({foo: 'bar'});
					stream.on.mock.calls.find(e => e[0] === 'end')[1]();
				})
					.then(() => listing)
					.then(r => {
						expect(context.client.listObjectsV2.mock.calls[0]).toEqual([bucketName, prefix, recursive, startAfter]);
						expect(r).toEqual([{foo: 'bar'}]);
					});
			});

			it('assumes prefix and recursive if not given', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjectsV2: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const listing = Service().actions.listObjectsV2.handler.bind(context)({params: {bucketName}});
				return Promise.delay(100).then(() => {
					stream.on.mock.calls.find(e => e[0] === 'data')[1]({foo: 'bar'});
					stream.on.mock.calls.find(e => e[0] === 'end')[1]();
				})
					.then(() => listing)
					.then(r => {
						expect(context.client.listObjectsV2.mock.calls[0]).toEqual([bucketName, '', false, '']);
						expect(r).toEqual([{foo: 'bar'}]);
					});
			});

			it('rejects if the stream encountered an error', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjectsV2: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				const startAfter = 'that';
				const listing = Service().actions.listObjectsV2.handler.bind(context)({params: {bucketName, prefix, recursive, startAfter}});
				return Promise.delay(100).then(() => {
					stream.on.mock.calls.find(e => e[0] === 'error')[1](new Error('something went wrong'));
				})
					.then(() => listing)
					.catch(e => {
						expect(e.message).toEqual('something went wrong');
					});
			});

			it('rejects if the stream acquisition encountered an error', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjectsV2: () => {throw new Error('something went wrong');}
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				const startAfter = 'that';
				return Service().actions.listObjectsV2.handler.bind(context)({params: {bucketName, prefix, recursive, startAfter}})
					.catch(e => {
						expect(e.message).toEqual('something went wrong');
					});
			});
		});
	});
});
