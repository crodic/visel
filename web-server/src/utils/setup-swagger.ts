import { type AllConfigType } from '@/config/config.type';
import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService<AllConfigType>);
  const appName = configService.getOrThrow('app.name', { infer: true });

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('A boilerplate project')
    .setVersion('1.0')
    .setContact(
      'Crodic Crystal',
      'https://crodic.id.vn',
      'alice01422@gmail.com',
    )
    .addBearerAuth({ type: 'http', name: 'Bearer' }, 'Bearer')
    // .addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key')
    .addServer(
      configService.getOrThrow('app.url', { infer: true }),
      'Development',
    )
    .addServer('https://example.com', 'Staging')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const removePrefixes = ['/nestlens', '/__nestlens__/', '/api/__nestlens__/'];

  for (const path of Object.keys(document.paths)) {
    if (removePrefixes.some((prefix) => path.startsWith(prefix))) {
      delete document.paths[path];
    }
  }

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: appName,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

export default setupSwagger;
