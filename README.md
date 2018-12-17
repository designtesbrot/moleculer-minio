[![Moleculer logo](http://moleculer.services/images/banner.png)](https://github.com/moleculerjs/moleculer)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdesigntesbrot%2Fmoleculer-minio.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdesigntesbrot%2Fmoleculer-minio?ref=badge_shield)

[![Build Status](https://travis-ci.com/designtesbrot/moleculer-minio.svg?branch=master)](https://travis-ci.com/designtesbrot/moleculer-minio)
[![Coverage Status](https://coveralls.io/repos/github/designtesbrot/moleculer-minio/badge.svg?branch=master)](https://coveralls.io/github/designtesbrot/moleculer-minio?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7f8245b6a42249a7b3f5de62d88a9ef4)](https://www.codacy.com/app/designtesbrot/moleculer-minio?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=designtesbrot/moleculer-minio&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/92a1e223f18762feb513/maintainability)](https://codeclimate.com/github/designtesbrot/moleculer-minio/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/designtesbrot/moleculer-minio/badge.svg)](https://snyk.io/test/github/designtesbrot/moleculer-minio)
[![npm version](https://badge.fury.io/js/moleculer-minio.svg)](https://badge.fury.io/js/moleculer-minio)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/39e921971bba8ef74126)

# Minio Service for the Moleculer framework

This Services provides actions for managing buckets and objects in an AWS S3 or [Minio](https://www.minio.io) powered backend. It 
utilizes the file streaming capabilities of the moleculer framework

## Features

The following List details which features are implemented

- Bucket Management (Create, Delete, List)
- Object Management (Put, List, Delete, Stat)
- Presigned URL Management (Generate presigned URLs and Post Policy signed URLs)

## Roadmap

The following List details which features are yet to be implemented

- Caching
- Broadcasting Bucket Notification as moleculer events

## Requirements

This service relies on [Minio](https://www.minio.io) or a generic AWS S3 endpoint available. Make sure to configure the service properly in
order to connect to your endpoint. Using Minio Gatewy capabilities, you can easily fan out to Azure and the like. This repository includes
an example, which itself includes a docker-compose file connecting to an inlcuded minio backend.

## Install

This package is available in the npm-registry. In order to use it simply install it with yarn (or npm):

```bash
yarn add moleculer-minio
```

## Usage

To make use of this Service, simply require it and create a new service:

```js
const fs = require("fs");
let { ServiceBroker } = require("moleculer");
let MinioService = require("moleculer-minio");

let broker = new ServiceBroker({ logger: console });

// Create a service
broker.createService({
    mixins: MinioService,
    settings: {
        // ... see settings for connectivity
    }
});

// Start server
broker.start()
    .then(() => broker.call('minio.makeBucket', {bucketName: 'my-bucket', region: 'us-east-1'}))
    .then(() => 
        broker.call(
            'minio.putObject', 
            fs.createReadStream('./archive.tar.gz'), 
            {
                meta: {
                    bucketName: 'my-bucket',
                    objectName: 'my-object.tar.gz',
                    metaData: {
                        foo: 'bar'
                    }
                }
            }
        ))
    .then(() =>
        broker.call('minio.presignedGetObject', {
            bucketName: 'my-bucket',
            objectName: 'my-object.tar.gz',
            expires: 600
        }))
    .then(console.log);
```

For a more indepth example checkout out the `examples folder`. It includes a docker-compose file, running `docker-compose up` will boot a broker with a minio service, a connected minio backend
and an API Gateway to upload files to. This project includes a [published postman collection](https://app.getpostman.com/run-collection/39e921971bba8ef74126) enabling you to quickly explore the service in your local environment.

## Settings

<!-- AUTO-CONTENT-START:SETTINGS -->
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `endPoint` | `String` | **required** | The Hostname minio is running on and available at. Hostname or IP-Address |
| `port` | `Number` | **required** | TCP/IP port number minio is listening on. Default value set to 80 for HTTP and 443 for HTTPs. |
| `useSSL` | `Boolean` | `null` | If set to true, https is used instead of http. Default is true. |
| `accessKey` | `String` | **required** | The AccessKey to use when connecting to minio |
| `secretKey` | `String` | **required** | The SecretKey to use when connecting to minio |
| `region` | `String` | `null` | Set this value to override region cache |
| `transport` | `String` | `null` | Set this value to pass in a custom transport. (Optional) |
| `sessionToken` | `String` | `null` | Set this value to provide x-amz-security-token (AWS S3 specific). (Optional) |
| `minioHealthCheckInterval` | `Number` | `null` | This service will perform a periodic healthcheck of Minio. Use this setting to configure the inverval in which the healthcheck is performed. Set to `0` to turn healthcheks of |

<!-- AUTO-CONTENT-END:SETTINGS -->

<!-- AUTO-CONTENT-TEMPLATE:SETTINGS
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each this}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^this}}
*No settings.*
{{/this}}

-->

## Actions

<!-- AUTO-CONTENT-START:ACTIONS -->
## `makeBucket` 

Creates a new Bucket

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | The name of the bucket |
| `region` | `string` | **required** | The region to create the bucket in. Defaults to "us-east-1" |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `listBuckets` 

Lists all buckets.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
*No input parameters.*

### Results
**Type:** `PromiseLike.<(Array.<Bucket>|Error)>`




## `bucketExists` 

Checks if a bucket exists.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |

### Results
**Type:** `PromiseLike.<(boolean|Error)>`




## `removeBucket` 

Removes a bucket.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |

### Results
**Type:** `PromiseLike.<(boolean|Error)>`




## `listObjects` 

Lists all objects in a bucket.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |
| `prefix` | `string` | **required** | The prefix of the objects that should be listed (optional, default ''). |
| `recursive` | `boolean` | **required** | `true` indicates recursive style listing and false indicates directory style listing delimited by '/'. (optional, default `false`). |

### Results
**Type:** `PromiseLike.<(Array.<Object>|Error)>`




## `listObjectsV2` 

Lists all objects in a bucket using S3 listing objects V2 API

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |
| `prefix` | `string` | **required** | The prefix of the objects that should be listed (optional, default ''). |
| `recursive` | `boolean` | **required** | `true` indicates recursive style listing and false indicates directory style listing delimited by '/'. (optional, default `false`). |
| `startAfter` | `string` | **required** | Specifies the object name to start after when listing objects in a bucket. (optional, default ''). |

### Results
**Type:** `PromiseLike.<(Array.<Object>|Error)>`




## `listIncompleteUploads` 

Lists partially uploaded objects in a bucket.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |
| `prefix` | `string` | **required** | The prefix of the objects that should be listed (optional, default ''). |
| `recursive` | `boolean` | **required** | `true` indicates recursive style listing and false indicates directory style listing delimited by '/'. (optional, default `false`). |

### Results
**Type:** `PromiseLike.<(Array.<Object>|Error)>`




## `getObject` 

Downloads an object as a stream.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket |
| `objectName` | `string` | **required** | Name of the object. |

### Results
**Type:** `PromiseLike.<(ReadableStream|Error)>`




## `getPartialObject` 

Downloads the specified range bytes of an object as a stream.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `offset` | `number` | **required** | `offset` of the object from where the stream will start. |
| `length` | `number` | **required** | `length` of the object that will be read in the stream (optional, if not specified we read the rest of the file from the offset). |

### Results
**Type:** `PromiseLike.<(ReadableStream|Error)>`




## `fGetObject` 

Downloads and saves the object as a file in the local filesystem.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `filePath` | `string` | **required** | Path on the local filesystem to which the object data will be written. |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `putObject` 

Uploads an object from a stream/Buffer.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `params` | `ReadableStream` | **required** | Readable stream. |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `size` | `number` | **required** | Size of the object (optional). |
| `metaData` | `object` | **required** | metaData of the object (optional). |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `fPutObject` 

Uploads contents from a file to objectName.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `filePath` | `string` | **required** | Path of the file to be uploaded. |
| `metaData` | `object` | **required** | metaData of the object (optional). |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `copyObject` 

Copy a source object into a new object in the specified bucket.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `sourceObject` | `string` | **required** | Path of the file to be copied. |
| `conditions` | `object` | **required** | Conditions to be satisfied before allowing object copy. |
| `metaData` | `object` | **required** | metaData of the object (optional). |

### Results
**Type:** `PromiseLike.<({etag: {string}, lastModified: {string}}|Error)>`




## `statObject` 

Gets metadata of an object.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |

### Results
**Type:** `PromiseLike.<({size: {number}, metaData: {object}, lastModified: {string}, etag: {string}}|Error)>`




## `removeObject` 

Removes an Object

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `removeObjects` 

Removes a list of Objects

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectNames` | `Array.<string>` | **required** | Names of the objects. |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `removeIncompleteUpload` 

Removes a partially uploaded object.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |

### Results
**Type:** `PromiseLike.<(undefined|Error)>`




## `presignedUrl` 

Generates a presigned URL for the provided HTTP method, 'httpMethod'. Browsers/Mobile clients may point to this URL to directly download objects even if the bucket is private. This
presigned URL can have an associated expiration time in seconds after which the URL is no longer valid. The default value is 7 days.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `httpMethod` | `string` | **required** | The HTTP-Method (eg. `GET`). |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `expires` | `number` | **required** | Expiry time in seconds. Default value is 7 days. (optional) |
| `reqParams` | `object` | **required** | request parameters. (optional) |
| `requestDate` | `string` | **required** | An ISO date string, the url will be issued at. Default value is now. (optional) |

### Results
**Type:** `PromiseLike.<(String|Error)>`




## `presignedGetObject` 

Generates a presigned URL for HTTP GET operations. Browsers/Mobile clients may point to this URL to directly download objects even if the bucket is private. This presigned URL can have an
associated expiration time in seconds after which the URL is no longer valid. The default value is 7 days.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `expires` | `number` | **required** | Expiry time in seconds. Default value is 7 days. (optional) |
| `reqParams` | `object` | **required** | request parameters. (optional) |
| `requestDate` | `string` | **required** | An ISO date string, the url will be issued at. Default value is now. (optional) |

### Results
**Type:** `PromiseLike.<(String|Error)>`




## `presignedPutObject` 

Generates a presigned URL for HTTP PUT operations. Browsers/Mobile clients may point to this URL to upload objects directly to a bucket even if it is private. This presigned URL can have
an associated expiration time in seconds after which the URL is no longer valid. The default value is 7 days.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `bucketName` | `string` | **required** | Name of the bucket. |
| `objectName` | `string` | **required** | Name of the object. |
| `expires` | `number` | **required** | Expiry time in seconds. Default value is 7 days. (optional) |

### Results
**Type:** `PromiseLike.<(String|Error)>`




## `presignedPostPolicy` 

Allows setting policy conditions to a presigned URL for POST operations. Policies such as bucket name to receive object uploads, key name prefixes, expiry policy may be set.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `policy` | `object` | **required** | Policy object created by minioClient.newPostPolicy() |

### Results
**Type:** `PromiseLike.<({postURL: {string}, formData: {object}}|Error)>`




<!-- AUTO-CONTENT-END:ACTIONS -->

<!-- AUTO-CONTENT-TEMPLATE:ACTIONS
{{#each this}}
## `{{name}}` {{#each badges}}{{this}} {{/each}}
{{#since}}
_<sup>Since: {{this}}</sup>_
{{/since}}

{{description}}

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each params}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^params}}
*No input parameters.*
{{/params}}

{{#returns}}
### Results
**Type:** {{type}}

{{description}}
{{/returns}}

{{#hasExamples}}
### Examples
{{#each examples}}
{{this}}
{{/each}}
{{/hasExamples}}

{{/each}}
-->

# Methods

<!-- AUTO-CONTENT-START:METHODS -->
## `createMinioClient` 

Creates and returns a new Minio client

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
*No input parameters.*

### Results
**Type:** `Client`




<!-- AUTO-CONTENT-END:METHODS -->

<!-- AUTO-CONTENT-TEMPLATE:METHODS
{{#each this}}
## `{{name}}` {{#each badges}}{{this}} {{/each}}
{{#since}}
_<sup>Since: {{this}}</sup>_
{{/since}}

{{description}}

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each params}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^params}}
*No input parameters.*
{{/params}}

{{#returns}}
### Results
**Type:** {{type}}

{{description}}
{{/returns}}

{{#hasExamples}}
### Examples
{{#each examples}}
{{this}}
{{/each}}
{{/hasExamples}}

{{/each}}
-->

## Test
```
$ docker-compose exec package yarn test
```

In development with watching

```
$ docker-compose up
```

## License
moleculer-minio is available under the [MIT license](https://tldrlegal.com/license/mit-license).


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdesigntesbrot%2Fmoleculer-minio.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdesigntesbrot%2Fmoleculer-minio?ref=badge_large)
