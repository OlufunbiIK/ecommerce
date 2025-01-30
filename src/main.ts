/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketAdapter } from './webSocket.Adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTTP requests
  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Use the custom WebSocket adapter
  app.useWebSocketAdapter(new WebSocketAdapter(app));

  await app.listen(3002);
}
bootstrap();
