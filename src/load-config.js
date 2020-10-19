import { cosmiconfigSync } from 'cosmiconfig';

/**
 * Load a config file.
 */
export const loadConfig = (name, opts = {}) => {
  const explorer = cosmiconfigSync(name, opts);
  const { config } = explorer.search() || {};

  return config;
};
