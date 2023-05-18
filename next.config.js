// https://v4.webpack.js.org/concepts/plugins/
// From https://github.com/taehwanno/warnings-to-errors-webpack-plugin/blob/master/index.js
class WarningsToErrorsPlugin {
  apply(compiler) {
    compiler.hooks.shouldEmit.tap("WarningsToErrorsPlugin", compilation => {
      if (compilation.warnings.length > 0) {
        compilation.errors = compilation.errors.concat(compilation.warnings);
        compilation.warnings = [];
      }

      for (const child of compilation.children) {
        if (child.warnings.length > 0) {
          child.errors = child.errors.concat(child.warnings);
          child.warnings = [];
        }
      }
    });
  }
}

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// TODO https://github.com/zeit/next.js/blob/canary/examples/with-next-offline/next.config.js

module.exports = (phase, { defaultConfig }) => {
  return {
    output: "export",
    trailingSlash: true,
    typescript: {
      ignoreBuildErrors: true || phase === PHASE_DEVELOPMENT_SERVER,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    webpack(config, options) {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      // config.resolve.alias.Data = dataFolder;

      config.plugins.push(new WarningsToErrorsPlugin());
      return config;
    },
  };
};
