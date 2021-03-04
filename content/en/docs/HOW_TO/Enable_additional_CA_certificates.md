---
title: Enable additional CA certificates
linkTitle: Enable additional CA certificates
weight: 80
date: 2021-03-02
---

This document describes how to enable additional certificate authority (CA) certificates.

## Introduction

In closed environments, self-signed or privately signed certificates are commonly used, and rejected by Node.js since their root CAs are not known.

As of Node.js 7.3.0 (and LTS versions 6.10.0 and 4.8.0), it is possible to add well-known extra certificates to Node.js with a `NODE_EXTRA_CA_CERTS` environment variable. It can be useful in the cloud environment or other deployment environments to add trusted certificates as a matter of policy (as opposed to explicit coding), or on personal machines, for example, adding CAs for proxy servers.

## Prerequisites

You need to have the following:

* Node.js 7.3.0 or above

## Documentation and resources

Useful resources on how to use the product:

* [nodejs.org](https://nodejs.org/api/cli.html#cli_node_extra_ca_certs_file)

* [CA certificate structure](https://github.com/nodejs/node/blob/master/src/node_root_certs.h)

## Set the additional CA certificates

To set the additional CA certificates, use the following environmental parameter:

```
NODE_EXTRA_CA_CERTS=file
```

When set, well known "root" CAs (like VeriSign) will be extended with the extra certificates in a file. The file should consist of one or more trusted certificates in PEM format. A "process.emitWarning()" message will be emitted (once) if the file is missing or malformed, but any errors are otherwise ignored.

Note that neither the well known nor extra certificates are used when the ca options property is explicitly specified for a TLS or HTTPS client or server. For more informaton, check the [link!](https://nodejs.org/api/cli.html#cli_use_bundled_ca_use_openssl_ca)

### Step 1: Create and download your certificate

The file should consist of one or more trusted certificates in PEM format.

**File structure example:**

```
// extra-ca-certs.pem

-----BEGIN CERTIFICATE-----
{your certificate}
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
{your certificate}
-----END CERTIFICATE-----
```

### Step 2: Add NODE_EXTRA_CA_CERTS to your env variables

In the terminal:

```
export NODE_EXTRA_CA_CERTS=./extra-ca-certs.pem
```

In the `package.json` file:

```
"start": "NODE_EXTRA_CA_CERTS=./extra-ca-certs.pem node ."
```

In the Docker container:

```
docker run --name <CONTAINER_NAME> -e NODE_EXTRA_CA_CERTS=./extra-ca-certs.pem -p 8081:8081 -d <IMAGE_NAME>
```
