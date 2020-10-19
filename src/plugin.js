import { getPackages } from '@lerna/project';
import PackageGraph from '@lerna/package-graph';
import collectUpdates from '@lerna/collect-updates';

import { loadConfig } from './load-config';

/**
 * Report the next version to be published using lerna.
 */
export const lerna = async () => {
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
    message(`:rocket: Merging this PR will publish a new version of the \`${pkg.name}\` package.`);
  });

  if (!changed.length) {
    message([
      ':thinking: Merging this PR will not publish a new version of any packages.',
      'If you want a new version of one of the packages in this mono-repo to be published please',
      'add an appropriate semantic commit message (e.g. one prefixed with `fix` or `feat`)',
      'when adding, modifying or deleting a file in that package. If you are not fixing a bug',
      'or adding a new feature to a package perhaps you do not actually need anything published',
      '(e.g. if fixing tests or adding a new dev dependency only).',
      'See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more details.',
    ].join(' '));
  }
};
