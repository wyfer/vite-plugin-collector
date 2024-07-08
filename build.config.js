import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  clean: false,
  declaration: false,
  externals: ["vite"],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
