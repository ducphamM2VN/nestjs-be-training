import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('BE-Movie')
    .setDescription('BE-Movie for frontend')
    .setVersion('1.0')
    .addTag('Movie')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  // app.enableCors({
  //   origin: configService.get<string>('ENDPOINT_CORS'),
  //   credentials: true,
  // });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
