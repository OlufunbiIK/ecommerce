/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketAdapter } from './webSocket.Adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTTP requestshhhhh
  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The API description for the Blog ')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT LICENSE',
      'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3500')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Use the custom WebSocket adapter
  app.useWebSocketAdapter(new WebSocketAdapter(app));

  await app.listen(3002);
}
bootstrap();
