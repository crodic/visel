import { AllConfigType } from '@/config/config.type';
import { STORAGE_PROVIDER } from '@/constants/provider.constant';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { StorageProvider } from '../../common/interfaces/storage-provider.interface';
import {
  ImageFormat,
  UploadFileOptions,
  UploadImageOptions,
} from './upload.types';
import { FileValidator } from './validators/file.validator';

@Injectable()
export class FileUploadService {
  private readonly root: string;

  constructor(
    private readonly config: ConfigService<AllConfigType>,
    private readonly validator: FileValidator,
    @Inject(STORAGE_PROVIDER)
    private readonly storage: StorageProvider,
  ) {
    this.root = this.config.get<AllConfigType>('app.uploadFolder', {
      infer: true,
    });

    if (!existsSync(this.root)) {
      mkdirSync(this.root, { recursive: true });
    }
  }

  private prepareFolder(folder: string): string {
    const target = join(this.root, folder);
    if (!existsSync(target)) mkdirSync(target, { recursive: true });
    return target;
  }

  private extractExt(mime: string): ImageFormat {
    if (mime.includes('png')) return 'png';
    if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpeg';
    return 'webp';
  }

  private applyFormat(img: sharp.Sharp, format: ImageFormat, quality: number) {
    switch (format) {
      case 'webp':
        return img.webp({ quality });
      case 'jpeg':
        return img.jpeg({ quality });
      case 'png':
        return img.png({ compressionLevel: quality >= 90 ? 1 : 9 });
      default:
        return img;
    }
  }

  async uploadImage(
    file: Express.Multer.File,
    options: UploadImageOptions = {},
  ) {
    const {
      folder = 'default',
      format,
      quality = 80,
      compress = true,
      withName,
      sizes = [],
      generateThumbnail = false,
      thumbnailWidth = 300,
    } = options;

    this.validator.validateImage(file, options);

    const detectedExt = this.extractExt(file.mimetype);

    const targetPath = this.prepareFolder(folder);

    const baseName = withName ?? file.originalname.replace(/\.[^.]+$/, '');
    const ext = format ?? detectedExt;
    const filename = `${Date.now()}-${baseName}.${ext}`;
    const fullPath = join(targetPath, filename);

    let img = sharp(file.buffer);

    if (format) {
      img = this.applyFormat(img, format, quality);
    } else if (compress) {
      img = img.webp({ quality });
    }

    // const buffer = await img.toBuffer();
    // await this.storage.save(buffer, filename);

    await img.toFile(fullPath);

    const result = {
      original: `${folder}/${filename}`,
      sizes: {} as Record<string, string>,
      thumbnail: null as string | null,
    };

    // Process multi-size
    for (const size of sizes) {
      const resizedFolder = `${folder}/${size.name}`;
      const resizedPath = this.prepareFolder(resizedFolder);

      const resizedName = `${Date.now()}-${baseName}-${size.name}.${ext}`;
      const resizedFullPath = join(resizedPath, resizedName);

      await sharp(file.buffer).resize(size.width).toFile(resizedFullPath);

      result.sizes[size.name] = `${resizedFolder}/${resizedName}`;
    }

    // Thumbnail
    if (generateThumbnail) {
      const thumbFolder = `${folder}/thumbs`;
      const thumbPath = this.prepareFolder(thumbFolder);
      const thumbName = `${Date.now()}-${baseName}-thumb.${ext}`;

      await sharp(file.buffer)
        .resize(thumbnailWidth)
        .toFile(join(thumbPath, thumbName));

      result.thumbnail = `${thumbFolder}/${thumbName}`;
    }

    return result;
  }

  async uploadImageWithStorage(
    file: Express.Multer.File,
    options: UploadImageOptions = {},
  ) {
    const {
      folder = 'default',
      format,
      quality = 80,
      compress = true,
      withName,
      sizes = [],
      generateThumbnail = false,
      thumbnailWidth = 300,
    } = options;

    this.validator.validateImage(file, options);

    const detectedExt = this.extractExt(file.mimetype);

    const baseName = withName ?? file.originalname.replace(/\.[^.]+$/, '');
    const ext = format ?? detectedExt;
    const filename = `${Date.now()}-${baseName}.${ext}`;

    let img = sharp(file.buffer);

    if (format) {
      img = this.applyFormat(img, format, quality);
    } else if (compress) {
      img = img.webp({ quality });
    }

    const buffer = await img.toBuffer();
    await this.storage.save(buffer, `${folder}/${filename}`);

    const result = {
      original: `${folder}/${filename}`,
      sizes: {} as Record<string, string>,
      thumbnail: null as string | null,
    };

    // Process multi-size
    for (const size of sizes) {
      const resizedFolder = `${folder}/${size.name}`;

      const resizedName = `${Date.now()}-${baseName}-${size.name}.${ext}`;

      const sizeBuffer = await sharp(file.buffer).resize(size.width).toBuffer();
      await this.storage.save(sizeBuffer, `${resizedFolder}/${resizedName}`);

      result.sizes[size.name] = `${resizedFolder}/${resizedName}`;
    }

    // Thumbnail
    if (generateThumbnail) {
      const thumbFolder = `${folder}/thumbs`;
      const thumbName = `${Date.now()}-${baseName}-thumb.${ext}`;

      const thumbBuffer = await sharp(file.buffer)
        .resize(thumbnailWidth)
        .toBuffer();
      await this.storage.save(thumbBuffer, `${thumbFolder}/${thumbName}`);

      result.thumbnail = `${thumbFolder}/${thumbName}`;
    }

    return result;
  }

  async uploadImages(
    files: Express.Multer.File[],
    options: UploadImageOptions = {},
  ) {
    console.log(files);
    if (!files || files.length === 0) throw new Error('No files provided');

    return Promise.all(files.map((file) => this.uploadImage(file, options)));
  }

  async uploadFile(file: Express.Multer.File, options: UploadFileOptions = {}) {
    const { folder = 'files', rename = true } = options;

    this.validator.validateFile(file, options);

    const target = this.prepareFolder(folder);

    const ext = file.originalname.split('.').pop();
    const base = file.originalname.replace(/\.[^.]+$/, '');

    const filename = rename
      ? `${Date.now()}-${base}.${ext}`
      : file.originalname;
    const fullPath = join(target, filename);

    writeFileSync(fullPath, file.buffer);

    return {
      path: `${folder}/${filename}`,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  async uploadFileWithStorage(
    file: Express.Multer.File,
    options: UploadFileOptions = {},
  ) {
    const { folder = 'files', rename = true } = options;

    this.validator.validateFile(file, options);

    const ext = file.originalname.split('.').pop();
    const base = file.originalname.replace(/\.[^.]+$/, '');

    const filename = rename
      ? `${Date.now()}-${base}.${ext}`
      : file.originalname;

    await this.storage.save(file.buffer, `${folder}/${filename}`);

    return {
      path: `${folder}/${filename}`,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  async uploadFiles(
    files: Express.Multer.File[],
    options: UploadFileOptions = {},
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    return Promise.all(files.map((f) => this.uploadFile(f, options)));
  }

  delete(path: string) {
    const fullPath = join(this.root, path);
    if (!existsSync(fullPath)) return false;

    unlinkSync(fullPath);
    return true;
  }
}
