const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const env = process.env.NODE_ENV;
const dev = env !== "production";

const path = require('path');
const {types} = require("sass");

const basePath = "";
const assetPrefix = dev ? "" : `${basePath}/`;

const createNextJsObfuscator = require("nextjs-obfuscator");
const withNextJsObfuscator = createNextJsObfuscator({disableConsoleOutput: false}, {
  patterns: ["./components/*.(js|jsx|ts|tsx)", "./utils/*.(js|jsx|ts|tsx)", "./controllers/*.(js|jsx|ts|tsx)"],

  log: true
});

const isObfuscate = process.env.NODE_ENV === "production";

const clientEnv = {
  LOCALHOST: process.env.LOCALHOST,
  assetPrefix,
  NEXT_PUBLIC_BUILD_DATE: Date.now(),
  ERUDA_TRICK: Boolean(process.env.ERUDA_TRICK),
  ERUDA_DEFAULT: Boolean(process.env.ERUDA_DEFAULT),
}

console.log("build clientEnv", clientEnv);

module.exports = (isObfuscate ? withNextJsObfuscator : config => config)(withBundleAnalyzer({
  output: dev ? undefined : 'export',
  env: clientEnv,
  basePath,
  assetPrefix,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [{
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            ref: true
          }
        }]
      },
      {
        test: /preloader.txt$/,
        use: ["raw-loader"],
      },
      {
        test: /\.html$/,
        use: ["raw-loader"],
      },
      {test: /\.(frag|vert)$/, use: 'raw-loader'}
    );


    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '../')],
    functions: {
      "addBasePath($path)": function (path) {
        return new types.String(basePath + path.getValue())
      }
    }
  },
}));

