import path from "path";
import type webpack from "webpack";
import type { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: [".ts", ".vue", ".js"],
    modules: [options.paths.src, "node_modules"],
    mainFiles: ["index"],
    alias: {
      "@app": path.resolve(options.paths.src, "app"),
      "@entities": path.resolve(options.paths.src, "entities"),
      "@views": path.resolve(options.paths.src, "views"),
      "@widgets": path.resolve(options.paths.src, "widgets"),
      "@features": path.resolve(options.paths.src, "features"),
      "@shared": path.resolve(options.paths.src, "shared"),
    },
  };
}
