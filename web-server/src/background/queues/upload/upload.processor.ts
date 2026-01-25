import { JobName, QueueName } from '@/constants/job.constant';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { UploadQueueService } from './upload-queue.service';

@Injectable()
@Processor(QueueName.UPLOAD)
export class UploadProcessor extends WorkerHost {
  private readonly logger = new Logger(UploadProcessor.name);
  constructor(private readonly uploadService: UploadQueueService) {
    super();
  }

  async process(job: any) {
    if (job.name === JobName.UPLOAD_IMAGE) {
      return await this.uploadService.uploadImage(job);
    }

    if (job.name === JobName.UPLOAD_FILE) {
      return await this.uploadService.uploadFile(job);
    }

    if (job.name === JobName.UPLOAD_IMAGES) {
      return await this.uploadService.uploadImages(job);
    }

    if (job.name === JobName.UPLOAD_FILES) {
      return await this.uploadService.uploadFiles(job);
    }

    throw new Error(`Unknown job name: ${job.name}`);
  }

  @OnWorkerEvent('active')
  async onActive(job: Job) {
    this.logger.debug(`Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  async onProgress(job: Job) {
    this.logger.debug(`Job ${job.id} is ${job.progress}% complete`);
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    this.logger.debug(`Job ${job.id} has been completed`);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job) {
    this.logger.error(
      `Job ${job.id} has failed with reason: ${job.failedReason}`,
    );
    this.logger.error(job.stacktrace);
  }

  @OnWorkerEvent('stalled')
  async onStalled(job: Job) {
    this.logger.error(`Job ${job.id} has been stalled`);
  }

  @OnWorkerEvent('error')
  async onError(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} has failed with error: ${error.message}`);
  }
}
