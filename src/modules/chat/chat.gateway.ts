import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8000, { namespace: 'chat' }) // 标记这个类是 websocket 网关
// 可选参数: port 端口号 默认和 HTTP 同端口
// 可选参数: namespace 命名空间 默认是 /
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() // 注入 Socket.io 的 Server 实例
  server: Server;

  // 1. 初始化网关
  afterInit(server: Server) {
    console.log('WebSocket 网关初始化完成');
  }

  // 2. 客户端链接成功时触发
  handleConnection(client: Socket) {
    // 客户端通过查询参数传递用户 id
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      // 无用户 id 视为没登录，拒绝链接
      client.disconnect();
      return;
    }

    // 把用户id绑定到 client 实例上，后续使用
    client.data.userId = userId;
    console.log('客户端连接成功', client.id, userId);
  }

  // 3. 客户端断开连接时触发
  handleDisconnect(client: Socket) {
    console.log('客户端断开连接', client.id);
  }

  // 4. 处理客户端发送的消息
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    console.log('收到客户端消息', client.id, payload);

    // method 1: 只给当前会话的客户端发送消息(回声)
    //client.emit('message', payload);

    // method 2: 给所有客户端发送消息(广播，除了当前客户端)
    // client.broadcast.emit('message', `${client.id} 发言：${payload}`);

    // method 3: 给所有客户端发送消息(广播)
    this.server.emit('message', `${client.id} 发言：${payload}`);
  }

  @SubscribeMessage('msgwithack')
  handleMsgWithAck(
    client: Socket,
    payload: any,
    ack: (success: boolean, msg: string) => void,
  ): void {
    try {
      console.log('收到客户端消息', client.id, payload);
      ack(true, '消息处理成功');
    } catch (error) {
      ack(false, '消息处理失败' + error.message);
    }
  }

  @SubscribeMessage('groupMsg')
  handleGroupMessage(
    client: Socket,
    { room, msg }: { room: string; msg: string },
  ) {
    const userId = client.data.userId;
    if (!userId || !room || !msg) {
      return;
    }

    // 给房间内的所有人发消息，包括自己
    this.server.to(room).emit('groupMsg', `${client.id} 发言：${msg}`);
  }
}
