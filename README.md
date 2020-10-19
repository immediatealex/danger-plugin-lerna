# danger-plugin-lerna

[![npm version](https://badge.fury.io/js/danger-plugin-lerna.svg)](https://badge.fury.io/js/danger-plugin-lerna)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![.github/workflows/deploy.yml](https://github.com/alexandermendes/danger-plugin-lerna/workflows/.github/workflows/release.yml/badge.svg)](https://github.com/alexandermendes/danger-plugin-lerna/actions)


> Reports which packages in a lerna mono-repo will be published.

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

If package changes are detected messages will be published like so:

|        | Message                                                               |
|--------|-----------------------------------------------------------------------|
| :book: | :rocket: A new version of the `stuff` package will be published.      |
| :book: | :rocket: A new version of the `more-stuff` package will be published. |

## Settings

The function accepts a settings object with the following properties:

| name              | description                                                 |
|-------------------|-------------------------------------------------------------|
| `emoji`           | An emoji to prepend to the success message                  |
| `noPublishMessage`| An optional message to show if there is nothing to publish. |
