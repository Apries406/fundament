import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    // 配置跨域
    const corsOptions = {
      origin: '*', // 允许的源
      methods: ['GET', 'POST'], // 允许的 HTTP 方法
      credentials: true, // 允许发送 Cookie 等凭证信息
    };

    // 合并配置，创建服务器
    const server = super.createIOServer(port, {
      ...options,
      cors: corsOptions,
    });

    return server;
  }
}
