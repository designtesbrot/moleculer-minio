const Service = () => require('service');
const Promise = require('bluebird');
describe('Service', () => {
	describe('actions', () => {
		describe('listObjects', () => {
			it('lists all objects in a Bucket', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjects: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				const listing = Service().actions.listObjects.handler.bind(context)({params: {bucketName, prefix, recursive}});
				return Promise.delay(100).then(() => {
					stream.on.mock.calls.find(e => e[0] === 'data')[1]({foo: 'bar'});
					stream.on.mock.calls.find(e => e[0] === 'end')[1]();
				})
					.then(() => listing)
					.then(r => {
						expect(context.client.listObjects.mock.calls[0]).toEqual([bucketName, prefix, recursive]);
						expect(r).toEqual([{foo: 'bar'}]);
					});
			});

			it('assumes prefix and recursive if not given', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjects: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const listing = Service().actions.listObjects.handler.bind(context)({params: {bucketName}});
				return Promise.delay(100).then(() => {
					stream.on.mock.calls.find(e => e[0] === 'data')[1]({foo: 'bar'});
					stream.on.mock.calls.find(e => e[0] === 'end')[1]();
				})
					.then(() => listing)
					.then(r => {
						expect(context.client.listObjects.mock.calls[0]).toEqual([bucketName, '', false]);
						expect(r).toEqual([{foo: 'bar'}]);
					});
			});

			it('rejects if the stream encountered an error', () => {
				let stream = {
					on: jest.fn()
				};
				let context = {
					client: {
						listObjects: jest.fn().mockReturnValue(stream)
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				const listing = Service().actions.listObjects.handler.bind(context)({params: {bucketName, prefix, recursive}});
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
						listObjects: () => {throw new Error('something went wrong');}
					},
					Promise
				};
				const bucketName = 'someBucket';
				const prefix = 'some-prefix';
				const recursive = true;
				return Service().actions.listObjects.handler.bind(context)({params: {bucketName, prefix, recursive}})
					.catch(e => {
						expect(e.message).toEqual('something went wrong');
					});
			});
		});
	});
});
