import { AllConfigType } from '@/config/config.type';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClsModule } from 'nestjs-cls';
import { join } from 'path';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './file-upload/upload.module';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { NotificationModule } from './notification/notification.module';
import { RoleModule } from './role/role.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AllConfigType>) => {
        const uploadRoot = config.get<AllConfigType>('app.uploadFolder', {
          infer: true,
        });

        return [
          {
            rootPath: join(__dirname, '..', '..', uploadRoot),
            serveRoot: '/uploads',
          },
        ];
      },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    UserModule,
    HealthModule,
    AuthModule,
    HomeModule,
    AuditLogModule,
    RoleModule,
    AdminUserModule,
    UploadModule,
    NotificationModule,
    SettingsModule,
  ],
})
export class ApiModule {}
