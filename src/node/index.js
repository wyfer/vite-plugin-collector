import sirv from "sirv";

import { bold, cyan, green } from "kolorist";
import { createRPCServer } from "vite-dev-rpc";
import { debounce } from "perfect-debounce";
import { DIR_CLIENT } from '../dir'

// component
import { scan } from './modules/assets.js';
import { packageInfo } from './modules/package.js';
import { getCruiseJson } from './modules/dependencyCruiser.js';
import { defaultOptions } from './conf/index.js';
import { mergeOptions } from "./utils/index.js";
export default function PluginCollector(options) {
  const option = mergeOptions(defaultOptions, options);

  let config = null;
  let packageJson = null;

  let locationUrl = null;

  return {
    name: "vite-plugin-collector",
    enforce: "pre",
    apply: "serve",
    async config(config, { mode }) {
      packageJson = await packageInfo();
      return config;
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    configureServer(server) {
      const base = server.config.base || "/";
      server.middlewares.use(
        `${base}__collect__`,
        sirv(DIR_CLIENT, {
          single: true,
          dev: true,
        })
      );

      server.middlewares.use((req, res, next) => {
        next();
      });

      const _printUrls = server.printUrls;
      const colorUrl = url => cyan(url.replace(/:(\d+)\//, (_, port) => `:${bold(port)}/`));

      server.printUrls = () => {
        const urls = server.resolvedUrls;

        locationUrl = urls.local[0].endsWith('/') ? urls.local[0].slice(0, -1) : urls.local[0];

        _printUrls();
        for (const url of [locationUrl])
          console.log(
            `  ${green("➜")}  ${bold("Vue collect")}: ${green(
              `Open ${colorUrl(`${url}/__collect__/`)} as a separate window`
            )}`
          );
      };

      const rpcFunctions = {
        moduleUpdated: () => {
          console.log("111");
          return "啦可视对讲法兰克束带结发拉卡手机大发立卡加上大连科技阿拉山口大姐夫阿拉山口大姐夫啊莱克斯顿法拉空数据";
        },
        getRoot: () => { },
        getFiles: async () => {
          return await scan(config, option);
        },
        getPackage: async () => {
          return packageJson;
        },
        getCruise: async () => {
          return await getCruiseJson(config, server, option.dependencyCruiserOptions);
        },
      };
      const rpcServer = createRPCServer("vite-plugin-collect", server.ws, rpcFunctions);

      const debouncedModuleUpdated = debounce(() => {
        rpcServer.moduleUpdated.asEvent("alsdkfalsdk");
      }, 100);

      const sendDevServerUrl = debounce(() => {
        rpcServer.sendHttpServerPath.asEvent(locationUrl);
      }, 100);

      server.middlewares.use((req, res, next) => {
        // debouncedModuleUpdated();
        sendDevServerUrl();
        next();
      });
    },
  };
}
