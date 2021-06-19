const path = require("path");
const { withPlugins } = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withGraphql = require("next-plugin-graphql");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

require("dotenv").config();

if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
        "fs-extra": "empty",
      };
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        isDevelopment ? "isomorphic-style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            esModule: true,
            modules: {
              auto: true,
              localIdentName: "[name]_[local]--[hash:base64:5]",
            },
          },
        },
        "postcss-loader",
        "sass-loader",
      ],
    });

    return config;
  },

  env: {
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_DB_URL: process.env.REACT_APP_DB_URL,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    STORAGE_NAME: process.env.STORAGE_NAME,
    HOMEPAGE_NAME: process.env.HOMEPAGE_NAME,
    KEY_VALUE: process.env.KEY_VALUE,
  },
};

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssModules: false,
        url: false,
      },
    ],
    [withFonts],
    [withImages],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]",
        },
        sassLoaderOptions: {
          includePaths: [path.resolve(__dirname, "./@"), "node_modules"],
        },
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    [withGraphql],
  ],
  nextConfig
);
