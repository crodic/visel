import { Module } from '@nestjs/common';
import 'dotenv/config';
import { Request } from 'express';
import { NestLensModule } from 'nestlens';

@Module({
  imports: [
    NestLensModule.forRoot({
      enabled: !!process.env.NEST_LENS_ENABLED,
      storage: {
        driver: 'redis',
        memory: { maxEntries: 100000 },
        redis: {
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: Number(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD || undefined,
        },
      },
      watchers: {
        query: { slowThreshold: 100, enabled: true },
        exception: { enabled: true },
        log: true,
        cache: true,
        mail: true,
      },
      authorization: {
        canAccess: (req: Request) => {
          const authHeader = req.headers.authorization;
          const send401 = () => {
            req.res?.setHeader('WWW-Authenticate', 'Basic realm="NestLens"');
            req.res?.status(401).end();
          };

          if (!authHeader) {
            send401();
            return false;
          }

          const [type, encoded] = authHeader.split(' ');
          if (type !== 'Basic' || !encoded) {
            send401();
            return false;
          }

          const decoded = Buffer.from(encoded, 'base64').toString();
          const [username, password] = decoded.split(':');

          const usernameConfig = process.env.NEST_LENS_USERNAME || 'nestlens';
          const passwordConfig = process.env.NEST_LENS_PASSWORD || 'admin@2026';

          const isValid =
            username === usernameConfig && password === passwordConfig;

          if (!isValid) {
            send401();
            return false;
          }

          return true;
        },
      },
    }),
  ],
  exports: [NestLensModule],
})
export class MonitoringModule {}
