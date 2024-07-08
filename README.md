# vite-plugin-collector

## Install

```bash
npm i -D vite-plugin-collector
```

> Since `vite-plugin-collector@v0.1.0`, Vite v3.1 or above is required.

Add plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import Collector from "vite-plugin-collector";

export default {
  plugins: [Collector()],
};
```

Then run `npm run dev` and visit [localhost:5173/\_\_collect/](http://localhost:5173/__collect/) to collecter the modules.

## Build Mode

transformation in serve mode

```ts
// vite.config.ts
import Collector from "vite-plugin-collector";

export default {
  plugins: [
    Collector({
      assets: {
        dir: "./assets copy",
      },
      dependencyCruiserOptions: {
        dir: resolve(__dirname, ""),
        alias: {
          "@": resolve(__dirname, ""),
        },
      },
    }),
  ],
};
```

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Yongfeng Wang](https://github.com/wyfer)
