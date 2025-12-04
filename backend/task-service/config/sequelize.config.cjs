// sequelize.config.cjs
const path = require('path');
const { pathToFileURL } = require('url');

// Convert the ESM path to a file URL
const esmPath = pathToFileURL(path.resolve(__dirname, './config.mjs')).href;

// Dynamically import your ESM config using Node’s async loader
let config;
(async () => {
  const imported = await import(esmPath);
  config = imported.default;
})();

// Export a getter so Sequelize CLI waits until import is done
module.exports = new Proxy({}, {
  get(_, prop) {
    if (!config) {
      throw new Error('Config not yet loaded — import("./config.mjs") not resolved.');
    }
    return config[prop];
  }
});
