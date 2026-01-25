import { ImageProcessor } from '@/common/interfaces/image-processor.interface';
import { StorageProvider } from '@/common/interfaces/storage-provider.interface';
import {
  IMAGE_PROCESSOR,
  STORAGE_PROVIDER,
} from '@/constants/provider.constant';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UploadQueueService {
  private readonly logger = new Logger(UploadQueueService.name);

  constructor(
    @Inject(IMAGE_PROCESSOR)
    private readonly imageProcessor: ImageProcessor,
    @Inject(STORAGE_PROVIDER)
    private readonly storage: StorageProvider,
  ) {}

  async uploadImages(job: any) {
    const {
      folder,
      files,
      format,
      sizes,
      quality,
      generateThumbnail = false,
      thumbnailWidth = 300,
    } = job.data;

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files provided in job');
    }

    const results = [];

    for (const f of files) {
      const { fileBuffer, filename } = f;

      const realBuffer = Buffer.from(fileBuffer);

      const baseBuffer = await this.imageProcessor.process(
        { buffer: realBuffer } as any,
        format,
        quality,
      );

      await this.storage.save(baseBuffer, `${folder}/${filename}`);

      const result = {
        original: this.storage.url(`${folder}/${filename}`),
        filename,
        sizes: {} as Record<string, string>,
        thumbnail: null as string | null,
      };

      if (sizes?.length) {
        for (const s of sizes) {
          const resized = await this.imageProcessor.resize(
            baseBuffer,
            s.width,
            format,
            quality,
          );

          const resizedFolder = `${folder}/${s.name}`;
          const resizedName = `${Date.now()}-${filename}`;
          const sizePath = `${resizedFolder}/${resizedName}`;

          await this.storage.save(resized, sizePath);

          result.sizes[s.name] = this.storage.url(sizePath);
        }
      }

      if (generateThumbnail) {
        const thumbnail = await this.imageProcessor.resize(
          baseBuffer,
          thumbnailWidth,
          format,
          quality,
        );

        const thumbFolder = `${folder}/thumbs`;
        const thumbName = `${Date.now()}-thumbnail-${filename}`;
        const thumbnailPath = `${thumbFolder}/${thumbName}`;

        await this.storage.save(thumbnail, thumbnailPath);

        result.thumbnail = this.storage.url(thumbnailPath);
      }

      results.push(result);
    }

    return { files: results };
  }

  async uploadImage(job: any) {
    const {
      fileBuffer,
      folder,
      filename,
      sizes,
      format,
      quality,
      generateThumbnail = false,
      thumbnailWidth = 300,
    } = job.data;

    const realBuffer = Buffer.from(fileBuffer);

    const baseBuffer = await this.imageProcessor.process(
      { buffer: realBuffer } as any,
      format,
      quality,
    );

    // Original image
    await this.storage.save(baseBuffer, `${folder}/${filename}`);

    const result = {
      original: this.storage.url(`${folder}/${filename}`),
      sizes: {} as Record<string, string>,
      thumbnail: null as string | null,
    };

    if (sizes?.length) {
      for (const s of sizes) {
        const resized = await this.imageProcessor.resize(
          baseBuffer,
          s.width,
          format,
          quality,
        );
        const resizedFolder = `${folder}/${s.name}`;
        const resizedName = `${Date.now()}-${filename}`;

        const sizePath = `${resizedFolder}/${resizedName}`;
        await this.storage.save(resized, sizePath);

        result.sizes[s.name] = this.storage.url(sizePath);
      }
    }

    if (generateThumbnail) {
      const thumbnail = await this.imageProcessor.resize(
        baseBuffer,
        thumbnailWidth,
        format,
        quality,
      );
      const thumbFolder = `${folder}/thumbs`;
      const thumbName = `${Date.now()}-thumbnail-${filename}`;

      const thumbnailPath = `${thumbFolder}/${thumbName}`;
      await this.storage.save(thumbnail, thumbnailPath);
      result.thumbnail = this.storage.url(thumbnailPath);
    }

    return result;
  }

  async uploadFile(job: any) {
    const { fileBuffer, folder, filename } = job.data;

    const realBuffer = Buffer.from(fileBuffer);

    await this.storage.save(realBuffer, `${folder}/${filename}`);

    return {
      path: this.storage.url(`${folder}/${filename}`),
      size: realBuffer.byteLength,
      mimeType: 'application/octet-stream',
    };
  }

  async uploadFiles(job: any) {
    const { folder, files, rename = false } = job.data;

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files provided in job');
    }

    const results = [];

    for (const f of files) {
      const { fileBuffer, originalName, mimeType } = f;

      const realBuffer = Buffer.from(fileBuffer);

      const ext = originalName.split('.').pop();
      const base = originalName.replace(/\.[^.]+$/, '');

      const filename = rename ? `${base}.${ext}` : originalName;

      await this.storage.save(realBuffer, `${folder}/${filename}`);

      results.push({
        filename,
        originalName,
        path: this.storage.url(`${folder}/${filename}`),
        size: realBuffer.byteLength,
        mimeType: mimeType ?? 'application/octet-stream',
      });
    }

    return { files: results };
  }
}
