'use strict';

const {ServiceBroker} = require('moleculer');
const MinioService = require('./..');

// Create broker
let broker = new ServiceBroker({
	logger: console,
	transporter: 'nats://nats:4222',
});

// Load services
broker.createService({
	mixins: MinioService,
	settings: {
		endPoint: 'minio',
		port: 9000,
		useSSL: false,
		accessKey: 'AKIAIOSFODNN7EXAMPLE',
		secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
	},
});

process.once('SIGUSR2', function() {
	broker.stop().then(() => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Start server
broker.start().then(() => broker.repl());
