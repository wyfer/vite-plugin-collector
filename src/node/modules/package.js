import path from 'node:path'
import fs from 'node:fs'

export const packageInfo = async () => {
  let packageJson = {};

  const dir = path.resolve(process.cwd());
  // 获取 package.json 的路径
  const packageJsonPath = path.resolve(dir, 'package.json');

  try {
    const data = fs.readFileSync(packageJsonPath, 'utf8');
    packageJson = JSON.parse(data);
  } catch (e) { }

  return packageJson;
}