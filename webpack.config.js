const fs = require("fs");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pageNameList = fs.readdirSync("./src/js/pages");

module.exports = (env) => ({
  entry: getEntryObj(),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          env.WEBPACK_BUILD === true ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: require("./babel.config.json").presets,
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new MiniCssExtractPlugin({ filename: "[name]_style.css" }),
    env.WEBPACK_BUILD === true ? new ESLintPlugin({ files: "./src" }) : () => {},
  ].concat(getHtmlWebpackPluginList()),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    watchFiles: path.resolve(__dirname, "./src/html/**/*.html"),
    open: false,
  },
  performance: {
    hints: false,
  },
});

function getEntryObj() {
  const obj = {};
  pageNameList.forEach((pageName) => {
    obj[pageName] = `./src/js/pages/${pageName}/index.js`;
  });
  return obj;
}

function getHtmlWebpackPluginList() {
  const list = [];

  pageNameList.forEach((pageName) => {
    list.push(
      new HtmlWebpackPlugin({
        template: `./src/html/pages/${pageName}.html`,
        filename: `${pageName}.html`,
        chunks: [`${pageName}`],
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      })
    );
  });
  return list;
}
