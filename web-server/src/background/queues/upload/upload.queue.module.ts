import { SharpImageProcessor } from '@/common/processors/sharp-image-processor.service';
import { QueueName } from '@/constants/job.constant';
import {
  IMAGE_PROCESSOR,
  STORAGE_PROVIDER,
} from '@/constants/provider.constant';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { LocalStorageProvider } from 'src/storage/local-storage.provider';
import { UploadQueueEvents } from './upload-queue.events';
import { UploadQueueService } from './upload-queue.service';
import { UploadProcessor } from './upload.processor';
import { UploadQueue } from './upload.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.UPLOAD,
    }),
  ],
  providers: [
    UploadQueue,
    UploadProcessor,
    {
      provide: STORAGE_PROVIDER,
      useClass: LocalStorageProvider,
    },
    {
      provide: IMAGE_PROCESSOR,
      useClass: SharpImageProcessor,
    },
    UploadQueueEvents,
    UploadQueueService,
  ],
  exports: [UploadQueue, UploadQueueService],
})
export class UploadQueueModule {}
