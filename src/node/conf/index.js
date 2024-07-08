export const defaultOptions = {
  // 默认选项
  // ...
  assets: {
    dir: ''
  },
  dependencyCruiserOptions: {
    dir: './views',
    maxDepth: 0,
    depth: 0,
    tsPreCompilationDeps: false,
    outputType: 'json',
    exclude: '^(node_modules)',
    alias: {}
  }
};
