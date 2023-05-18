// Based on https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#loaders
import { resolve as pnpResolve, load as pnpLoad } from "../.pnp.loader.mjs";

const babelOptions = {
  presets: ["@babel/preset-typescript", "@babel/preset-react"],
  // Don't look for configs
  configFile: false,
  babelrc: false,
  // Ignore any node_modules (not just those in current working directory)
  // https://github.com/babel/babel/blob/master/packages/babel-register/src/node.js#L146
  ignore: [/node_modules/],
};

const extensionsRegex = /\.ts$|\.tsx$/;

export async function resolve(specifier, context, nextResolve) {
  try {
    return await pnpResolve(specifier, context, nextResolve);
  } catch (err) {
    return await pnpResolve(specifier + ".ts", context, nextResolve);
  }
}

export async function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    const { source: rawSource } = await pnpLoad(
      url,
      {
        ...context,
        format: "module",
      },
      nextLoad
    );

    const { default: babel } = await import("@babel/core");

    const transformedSource = (
      await babel.transformAsync(rawSource.toString(), {
        sourceType: "module",
        filename: url,
        ...babelOptions,
      })
    ).code;

    return {
      format: "module",
      shortCircuit: true,
      source: transformedSource,
    };
  }
  return pnpLoad(url, context, nextLoad);
}
