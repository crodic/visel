import {
  UploadFileOptions,
  UploadImageOptions,
} from '@/api/file-upload/upload.types';
import { FileValidator } from '@/api/file-upload/validators/file.validator';
import { Injectable } from '@nestjs/common';
import { UploadQueue } from '../../background/queues/upload/upload.queue';

@Injectable()
export class AsyncUploadQueueService {
  constructor(
    private readonly validator: FileValidator,
    private readonly queue: UploadQueue,
  ) {}

  async uploadImage(file: Express.Multer.File, options: UploadImageOptions) {
    const {
      folder = 'images',
      format,
      quality = 80,
      sizes = [],
      compress,
      generateThumbnail,
      thumbnailWidth,
    } = options;

    this.validator.validateImage(file, options);

    const ext = format ?? this.validator.detectExt(file.mimetype);

    // const filename = `${Date.now()}.${format}`;
    const filename = `${Date.now()}-${file.originalname}.${ext}`;

    const job = await this.queue.addImageJob({
      fileBuffer: Array.from(file.buffer), // SAFE SERIALIZATION
      folder,
      filename,
      sizes,
      format: ext,
      quality,
      generateThumbnail,
      thumbnailWidth,
      compress,
    });

    return {
      jobId: job.id,
      filename,
      path: `${folder}/${filename}`,
    };
  }

  async uploadImages(
    files: Express.Multer.File[],
    options: UploadImageOptions,
  ) {
    const {
      folder = 'images',
      format,
      quality = 80,
      sizes = [],
      compress,
      generateThumbnail,
      thumbnailWidth,
    } = options;

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files provided');
    }

    const processedFiles = [];

    for (const file of files) {
      this.validator.validateImage(file, options);
      const ext = format ?? this.validator.detectExt(file.mimetype);
      const filename = `${Date.now()}-${file.originalname}.${ext}`;

      processedFiles.push({
        fileBuffer: Array.from(file.buffer),
        originalName: file.originalname,
        filename,
        mimetype: file.mimetype,
        ext,
        sizes,
        quality,
      });
    }

    const job = await this.queue.addImagesJob({
      folder,
      files: processedFiles,
      format,
      generateThumbnail,
      thumbnailWidth,
      compress,
      sizes,
      quality,
    });

    return {
      jobId: job.id,
      files: processedFiles.map((f) => ({
        filename: f.filename,
        path: `${folder}/${f.filename}`,
      })),
    };
  }

  async uploadFile(file: Express.Multer.File, options: UploadFileOptions) {
    const { folder = 'files', rename = true } = options;

    this.validator.validateFile(file, options);

    const ext = file.originalname.split('.').pop();
    const base = file.originalname.replace(/\.[^.]+$/, '');

    const filename = rename ? `${base}.${ext}` : file.originalname;

    const job = await this.queue.addFileJob({
      fileBuffer: Array.from(file.buffer),
      folder,
      filename,
    });

    return {
      jobId: job.id,
      filename,
      path: `${folder}/${filename}`,
    };
  }

  async uploadFiles(files: Express.Multer.File[], options: UploadFileOptions) {
    const { folder = 'files', rename = true } = options;

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files provided');
    }

    const processedFiles = [];

    for (const file of files) {
      this.validator.validateFile(file, options);

      const ext = file.originalname.split('.').pop();
      const base = file.originalname.replace(/\.[^.]+$/, '');

      const filename = rename
        ? `${Date.now()}-${base}.${ext}`
        : file.originalname;

      processedFiles.push({
        fileBuffer: Array.from(file.buffer), // SAFE SERIALIZATION
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
      });
    }

    const job = await this.queue.addFilesJob({
      folder,
      files: processedFiles,
    });

    return {
      jobId: job.id,
      files: processedFiles.map((f) => ({
        filename: f.filename,
        originalName: f.originalName,
        path: `${folder}/${f.filename}`,
      })),
    };
  }
}
