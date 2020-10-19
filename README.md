# danger-plugin-lerna

[![npm version](https://badge.fury.io/js/danger-plugin-yarn.svg)](https://badge.fury.io/js/danger-plugin-lerna)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Reports which packages will be published when a PR is merged.

## Usage

Install:

```sh
yarn add danger-plugin-lerna --dev
```

At a glance:

```js
// dangerfile.js
import lerna from 'danger-plugin-lerna';

schedule(lerna());
```
