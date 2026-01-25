import { AsyncUploadQueueService } from '@/api/file-upload/async-upload-queue.service';
import { UploadQueueModule } from '@/background/queues/upload/upload.queue.module';
import { SharpImageProcessor } from '@/common/processors/sharp-image-processor.service';
import {
  IMAGE_PROCESSOR,
  STORAGE_PROVIDER,
} from '@/constants/provider.constant';
import { Module } from '@nestjs/common';
import { LocalStorageProvider } from '../../storage/local-storage.provider';
import { FileUploadService } from './file-upload.service';
import { UploadController } from './upload.controller';
import { FileValidator } from './validators/file.validator';

@Module({
  imports: [UploadQueueModule],
  controllers: [UploadController],
  providers: [
    FileUploadService,
    FileValidator,
    AsyncUploadQueueService,
    {
      provide: STORAGE_PROVIDER,
      useClass: LocalStorageProvider,
    },
    {
      provide: IMAGE_PROCESSOR,
      useClass: SharpImageProcessor,
    },
  ],
  exports: [FileUploadService],
})
export class UploadModule {}
