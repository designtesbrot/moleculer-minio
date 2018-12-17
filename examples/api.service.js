'use strict';

const multer = require('multer');
const fs = require('fs');
const nodeRes = require('node-res');
const {ServiceBroker} = require('moleculer');
const ApiGatewayService = require('moleculer-web');

const upload = multer({dest: '/var/tmp/'});

// Create broker
let broker = new ServiceBroker({
	logger: console,
	transporter: 'nats://nats:4222'
});

// Load services
broker.createService({
	mixins: ApiGatewayService,
	settings: {
		routes: [
			{
				path: '/upload',
				use: [
					upload.single('file')
				],
				bodyParsers: {
					json: false,
					urlencoded: false
				},
				aliases: {
					'POST /'(req, res) {
						let stream = fs.createReadStream(req.file.path);
						return this.broker.call('minio.putObject', stream, {meta: req.body})
							.then(result => {
								this.logger.info('Object saved', result);
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.logger.error('Object save error', err);
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/putfrompath',
				bodyParsers: {
					json: true
				},
				aliases: {
					'POST /'(req, res) {
						return this.broker.call('minio.fPutObject', req.body)
							.then(result => {
								this.logger.info('Object saved', result);
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.logger.error('Object save error', err);
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/presignedurl',
				bodyParsers: {
					json: true
				},
				aliases: {
					'POST /'(req, res) {
						const options = Object.assign({}, req.body, {requestDate: new Date()});
						return this.broker.call('minio.presignedUrl', options)
							.then(result => {
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/presignedgetobject',
				bodyParsers: {
					json: true
				},
				aliases: {
					'POST /'(req, res) {
						const options = Object.assign({}, req.body, {requestDate: new Date()});
						return this.broker.call('minio.presignedGetObject', options)
							.then(result => {
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/presignedputobject',
				bodyParsers: {
					json: true
				},
				aliases: {
					'POST /'(req, res) {
						const options = Object.assign({}, req.body, {requestDate: new Date()});
						return this.broker.call('minio.presignedPutObject', options)
							.then(result => {
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/presignedpostpolicy',
				bodyParsers: {
					json: true
				},
				aliases: {
					'POST /'(req, res) {
						return this.broker.call('minio.presignedPostPolicy', req.body)
							.then(result => {
								nodeRes.send(req, res, result);
							}).catch(err => {
								this.sendError(req, res, err);
							});
					}
				}
			},
			{
				path: '/',
				whitelist: [
					// Access any actions in 'minio' service
					'minio.*'
				]
			}
		]
	}
});

process.once('SIGUSR2', function() {
	broker.stop().then(() => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Start server
broker.start().then(() => broker.repl());
