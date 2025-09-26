import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({ port: 8080 })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket 网关初始化完成');
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    console.log('ws 客户端链接');
    // 监听客户端的消息
    client.on('message', (data) => {
      const msg = data.toString(); // ws 接收到的是 buffer, 要转成字符串
      console.log('ws 收到消息', msg);
      // 回复客户端
      client.send('server 收到消息：' + msg);
    });
  }

  handleDisconnect(client: WebSocket) {
    console.log('ws 客户端断开连接');
  }
}
