/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(3004, { namespace: 'chat' })
export class ChatGateWay {
  //access to the server
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleNewMessage(@MessageBody() message: string): void {
    // broadcast the message to all connected clients
    this.server.emit('message', { data: message });
  }
}
