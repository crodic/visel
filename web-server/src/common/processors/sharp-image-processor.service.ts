import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { ImageProcessor } from '../interfaces/image-processor.interface';

@Injectable()
export class SharpImageProcessor implements ImageProcessor {
  async process(file: Express.Multer.File, format: string, quality: number) {
    return this.format(sharp(file.buffer), format, quality).toBuffer();
  }

  async resize(buffer: Buffer, width: number, format: string, quality: number) {
    return this.format(sharp(buffer).resize(width), format, quality).toBuffer();
  }

  private format(img: sharp.Sharp, format: string, quality: number) {
    switch (format) {
      case 'webp':
        return img.webp({ quality });
      case 'jpeg':
        return img.jpeg({ quality });
      case 'png':
        return img.png();
      default:
        return img.webp();
    }
  }
}
