
import { resolve, join } from "node:path";
import fg from "fast-glob";
import fsp from "node:fs/promises";

export const scan = async (config, options) => {
  const assetsDir = options?.assets?.dir || '';
  const dir = resolve(config.root, assetsDir);
  const baseURL = config.base;

  const files = await fg(
    [
      // image
      "**/*.(png|jpg|jpeg|gif|svg|webp|avif|ico|bmp|tiff)",
      // video
      "**/*.(mp4|webm|ogv|mov|avi|flv|wmv|mpg|mpeg|mkv|3gp|3g2|m2ts|vob|ogm|ogx|rm|rmvb|asf|amv|divx|m4v|svi|viv|f4v|f4p|f4a|f4b)",
      // audio
      "**/*.(mp3|wav|ogg|flac|aac|wma|alac|ape|ac3|dts|tta|opus|amr|aiff|au|mid|midi|ra|rm|wv|weba|dss|spx|vox|tak|dsf|dff|dsd|cda)",
      // font
      "**/*.(woff2?|eot|ttf|otf|ttc|pfa|pfb|pfm|afm)",
      // text
      "**/*.(json|json5|jsonc|txt|text|tsx|jsx|md|mdx|mdc|markdown|yaml|yml|toml)",
      // wasm
      "**/*.wasm",
    ],
    {
      cwd: dir,
      onlyFiles: true,
      caseSensitiveMatch: false,
      ignore: ["**/node_modules/**", "**/dist/**", "**/package-lock.*", "**/pnpm-lock.*", "**/pnpm-workspace.*"],
    }
  );

  let list = [];
  function guessType(path) {
    if (!path.includes('.')) return 'folder';
    if (/\.(png|jpe?g|jxl|gif|svg|webp|avif|ico|bmp|tiff?)$/i.test(path)) return "image";
    if (
      /\.(mp4|webm|ogv|mov|avi|flv|wmv|mpg|mpeg|mkv|3gp|3g2|ts|mts|m2ts|vob|ogm|ogx|rm|rmvb|asf|amv|divx|m4v|svi|viv|f4v|f4p|f4a|f4b)$/i.test(
        path
      )
    )
      return "video";
    if (
      /\.(mp3|wav|ogg|flac|aac|wma|alac|ape|ac3|dts|tta|opus|amr|aiff|au|mid|midi|ra|rm|wv|weba|dss|spx|vox|tak|dsf|dff|dsd|cda)$/i.test(
        path
      )
    )
      return "audio";
    if (/\.(woff2?|eot|ttf|otf|ttc|pfa|pfb|pfm|afm)/i.test(path)) return "font";
    if (/\.(json[5c]?|te?xt|[mc]?[jt]sx?|md[cx]?|markdown|ya?ml|toml)/i.test(path)) return "text";
    if (/\.wasm/i.test(path)) return "wasm";
    return "other";
  }

  list = await Promise.all(
    files.map(async path => {
      const filePath = resolve(dir, path);
      const stat = await fsp.lstat(filePath);
      // remove public prefix to resolve vite assets warning
      // path = path.startsWith(options?.assets?.dir) ? path.slice(7) : path;
      path = assetsDir + '/' + path

      return {
        path,
        publicPath: join(baseURL, path),
        filePath,
        type: guessType(path),
        size: stat.size,
        mtime: stat.mtimeMs,
      };
    })
  );



  // 递归生成树形结构
  function buildTree(paths) {
    const tree = [];

    paths.forEach((filePath) => {
      const pathParts = filePath.split('/');
      let currentNode = tree;

      pathParts.forEach((part, index) => {
        const existingNode = currentNode.find((node) => node.name === part);

        if (existingNode) {
          currentNode = existingNode.children || [];
        } else {
          const path = index === pathParts.length - 1 ? filePath : pathParts.slice(0, index + 1).join('/');
          const newNode = {
            name: part,
            path: path,
            type: guessType(path),
            children: []
          };
          currentNode.push(newNode);
          currentNode = newNode.children;
        }
      });
    });

    return tree;
  }

  // 输出树形对象结构
  const tree = buildTree(files);
  return {
    list,
    tree
  };
}


