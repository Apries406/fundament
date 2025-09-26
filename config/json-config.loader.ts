import * as fs from 'node:fs';
import * as path from 'node:path';

// 自定义加载器：返回配置对象
export const jsonConfigLoader = () => {
  // 读取 JSON 文件路径
  const configPath = path.resolve(process.cwd(), 'config/config.json');
  // 读取文件内容并转成 JSON 对象
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
};
