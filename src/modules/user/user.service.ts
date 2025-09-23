import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  // 注入 ConfigService
  constructor(private configService: ConfigService) {}

  getConfigDemo() {
    // 读取字符串配置 jwt 密钥
    const jwtSecret = this.configService.get('JWT_SECRET');
    console.log('jwt 密钥：', jwtSecret); // 输出 nest-demo-secrete-123

    // 读取数字配置 数据库端口，第二个参数是默认值
    const dbPort = this.configService.get<number>('DB_PORT', 3306);
    console.log('数据库端口：', dbPort); // 输出 3306

    // 读取布尔值，例如是否开启调试模式
    const isDebug = this.configService.get<boolean>('IS_DEBUG', false);
    console.log('是否开启调试模式：', isDebug); // 输出 false，因为 .env 里面没写这个 key，用默认值

    // 数据库密码必须存在，不存在就抛错
    const dbPassword = this.configService.getOrThrow('DB_PASSWORD');
    console.log('数据库密码：', dbPassword); // 如果 .env 里没写 DB_PASSWORD，启动时会报错
  }
}
