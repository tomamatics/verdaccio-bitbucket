[![Build Status](https://travis-ci.org/idangozlan/verdaccio-bitbucket.svg?branch=master)](https://travis-ci.org/idangozlan/verdaccio-bitbucket)
[![Download Status](https://img.shields.io/npm/dm/verdaccio-bitbucket.svg)](https://www.npmjs.com/package/verdaccio-bitbucket)
[![Download Status](https://img.shields.io/npm/v/verdaccio-bitbucket.svg)](https://www.npmjs.com/package/verdaccio-bitbucket)

# Verdaccio Module For User Auth Via Bitbucket

This module provides an engine for Verdaccio to make user authorizations via 
Bitbucket 2.0 API.

# Please note :bell:

This package is a just fork of https://github.com/idangozlan/verdaccio-bitbucket, but uses a non-deprecated Bitbucket API to resolve user permissions.
If you have trouble authenticating your verdaccio users with the original package, this may be your rescue.


## Install

As simple as running:

    $ npm install -g verdaccio-auth-bitbucket

## Configure

    auth:
      auth-bitbucket:
        allow: TeamOne(owner), TeamX(owner|collaborator|member), TeamZ
        ttl: 604800 # 7 days
        defaultMailDomain: gmail.com
        hashPassword: true
        cache: redis
        redis:
            host: '127.0.0.1'
            port: 6379
            prefix: 'verdaccio-bitbucket:'
    ...
    packages:
      '@myscope/*':
        allow_access: TeamZ
        allow_publish: TeamOne, TeamX # restrict to bitbucket teams


#### Auth Config
| Key               | Description                                                                                                                                                            | Options                | Default value |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|---------------|
| `allow`             | Bitbucket teams which should be allowed to access the registry, separated by user groups and commas. For ex. TeamOne(owner), TeamX(owner\|collaborator\|member), TeamZ | {string}               | null          |
| `ttl`               | Time-to-live of cache (seconds). For ex. 604800 = 7 days                                                                                                               | {number}               | 604800        |
| `defaultMailDomain` | Specify a default domain for the username, For ex. "gmail.com"                                                                                                         | {string}               | null          |
| `hashPassword`      | When using cache, it will save the passwords hashed (highly recommended)                                                                                               | {true\|false}          | true          |
| `cache`             | Caching engine to prevent re-accessing bitbucket servers. For Production usage and scaling, Redis is highly recommended                                                | redis\|in-memory\|null | in-memory     |
| `redis`             | YAML Nested Map of options for Redis Client creation (look on the config sample). Read more https://github.com/NodeRedis/node_redis                                    | YAML Nested Map        |               |


### More Details?

For more information please visit the original package https://github.com/idangozlan/verdaccio-bitbucket