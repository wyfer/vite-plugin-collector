import { readdirSync, lstatSync } from 'fs';
import { join, dirname } from 'path';

function buildTree(dir) {
  const files = readdirSync(dir);
  const tree = { name: dir, children: [] };

  files.forEach(file => {
    const path = join(dir, file);
    const stats = lstatSync(path);

    if (stats.isDirectory()) {
      tree.children.push(buildTree(path));
    } else {
      tree.children.push({ name: file });
    }
  });

  return tree;
}

const currentDir = dirname(new URL(import.meta.url).pathname);
const tree = buildTree(currentDir);

console.log(tree);
