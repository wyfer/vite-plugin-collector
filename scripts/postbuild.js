import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function patchCjs(cjsModulePath, name) {
  const cjsModule = readFileSync(cjsModulePath, "utf-8");
  writeFileSync(
    cjsModulePath,
    cjsModule
      .replace(`'use strict';`, `'use strict';Object.defineProperty(exports, '__esModule', {value: true});`)
      .replace(`module.exports = ${name};`, `exports.default = ${name};`),
    { encoding: "utf-8" }
  );
}

patchCjs(resolve("./dist/index.cjs"), "PluginCollector");
