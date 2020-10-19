import { getPackages } from '@lerna/project';
import PackageGraph from '@lerna/package-graph';
import collectUpdates from '@lerna/collect-updates';

import { loadConfig } from './load-config';

/**
 * Report the next version to be published using lerna.
 */
export const lerna = async ({
  emoji = ':rocket:',
  noPublishMessage,
  formatSuccessMessage,
} = {}) => {
  const cwd = process.cwd();
  const pkgs = await getPackages(cwd);
  const graph = new PackageGraph(pkgs);

  const lernaConfig = loadConfig('lerna', {
    searchPlaces: ['lerna.json', 'package.json'],
  });

  const hasLernaConfig = !!lernaConfig;

  if (!hasLernaConfig) {
    return;
  }

  const changed = collectUpdates(pkgs, graph, { cwd }, lernaConfig);

  changed.forEach((pkg) => {
    if (formatSuccessMessage) {
      message(formatSuccessMessage(emoji, pkg));
      return;
    }

    message(`${emoji} A new version of the \`${pkg.name}\` package will be published.`);
  });

  if (!changed.length && noPublishMessage) {
    message(noPublishMessage);
  }
};
