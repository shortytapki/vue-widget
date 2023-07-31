import type webpack from "webpack";
import type { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const scssLoader = {
    test: /\.(s[ac]ss|css)$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
    ],
  };

  const vueLoader = { test: /\.vue$/, loader: "vue-loader" };

  const typescriptLoader = {
    test: /\.ts?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: {
      appendTsSuffixTo: [/\.vue$/],
    },
  };

  return [typescriptLoader, scssLoader, vueLoader];
}
