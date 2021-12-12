/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Projeto NEST_JS')
    .setDescription('API REST integração com o banco de dados e postgres,utilizando prisma')
    .setVersion('1.0')
    .addTag('filmes')
    .addTag('generos')
    .addTag('participantes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
  });
}
bootstrap();
