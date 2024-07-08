export function mergeOptions(defaultOptions, newOptions) {
  // 创建一个新对象，将默认选项复制到其中
  const mergedOptions = Object.assign({}, defaultOptions);

  // 遍历新选项，并将其合并到 mergedOptions 中
  for (const key in newOptions) {
    if (newOptions.hasOwnProperty(key)) {
      // 如果值是对象，则递归调用 mergeOptions
      if (typeof newOptions[key] === 'object' && !Array.isArray(newOptions[key])) {
        // 确保默认选项中也存在该键，以便递归
        if (!mergedOptions[key] || typeof mergedOptions[key] !== 'object' || Array.isArray(mergedOptions[key])) {
          mergedOptions[key] = {};
        }
        // 递归调用 mergeOptions
        mergedOptions[key] = mergeOptions(mergedOptions[key], newOptions[key]);
      } else {
        // 否则直接替换值
        mergedOptions[key] = newOptions[key];
      }
    }
  }

  return mergedOptions;
}