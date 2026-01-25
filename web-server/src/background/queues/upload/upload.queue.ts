import { JobName, QueueName } from '@/constants/job.constant';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class UploadQueue {
  constructor(@InjectQueue(QueueName.UPLOAD) private readonly queue: Queue) {}

  async addImageJob(data: any) {
    return this.queue.add(JobName.UPLOAD_IMAGE, data);
  }

  async addImagesJob(data: any) {
    return this.queue.add(JobName.UPLOAD_IMAGES, data);
  }

  async addFileJob(data: any) {
    return this.queue.add(JobName.UPLOAD_FILE, data);
  }

  async addFilesJob(data: any) {
    return this.queue.add(JobName.UPLOAD_FILES, data);
  }
}
