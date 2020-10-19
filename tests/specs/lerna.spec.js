import mockFs from 'mock-fs';
import collectUpdates from '@lerna/collect-updates';
import { loadConfig } from '../../src/load-config';

import { setupEnv } from '../utils';
import lernaPlugin from '../../src';

jest.mock('../../src/load-config');
jest.mock('@lerna/collect-updates', () => jest.fn(() => []));

describe('Lerna', () => {
  beforeEach(setupEnv);

  afterEach(() => {
    mockFs.restore();
  });

  it('makes the expected call to load the config', async () => {
    await lernaPlugin();

    expect(loadConfig).toHaveBeenCalledWith('lerna', {
      searchPlaces: ['lerna.json', 'package.json'],
    });
  });

  describe('without config', () => {
    it('does not report anything', async () => {
      loadConfig.mockReturnValue(null);

      await lernaPlugin();

      expect(warn).not.toHaveBeenCalled();
      expect(message).not.toHaveBeenCalled();
    });
  });

  describe('with config', () => {
    beforeEach(() => {
      loadConfig.mockImplementation((mod) => {
        if (mod === 'lerna') {
          return {
            config: {
              conventionalCommits: true,
            },
          };
        }

        return null;
      });
    });

    it('reports new versions for each package', async () => {
      Object.assign(danger, {
        github: {
          pr: {},
        },
      });

      collectUpdates.mockReturnValue([
        {
          name: 'package-one',
        },
        {
          name: 'package-two',
        },
      ]);

      await lernaPlugin();

      expect(message).toHaveBeenCalledWith(
        expect.stringContaining('new version of the `package-one` package'),
      );
      expect(message).toHaveBeenCalledWith(
        expect.stringContaining('new version of the `package-two` package'),
      );
    });

    it('reports when no new versions will be published', async () => {
      Object.assign(danger, {
        github: {
          pr: {},
        },
      });

      collectUpdates.mockReturnValue([]);

      await lernaPlugin();

      expect(message).toHaveBeenCalledWith(expect.stringContaining('will not publish'));
    });
  });
});
