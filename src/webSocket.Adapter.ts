/* eslint-disable prettier/prettier */
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class WebSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://127.0.0.1:5500', // Update with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    return server;
  }
}
