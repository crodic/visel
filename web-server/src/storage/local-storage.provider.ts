import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { StorageProvider } from '../common/interfaces/storage-provider.interface';

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly root: string;

  constructor(private readonly config: ConfigService<AllConfigType>) {
    this.root = this.config.get<AllConfigType>('app.uploadFolder', {
      infer: true,
    });

    if (!existsSync(this.root)) {
      mkdirSync(this.root, { recursive: true });
    }
  }

  async save(buffer: Buffer, path: string): Promise<void> {
    const full = join(this.root, path);
    const dir = dirname(full);

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    writeFileSync(full, buffer);
  }

  async delete(path: string) {
    const full = join(this.root, path);
    if (existsSync(full)) unlinkSync(full);
  }

  url(path: string) {
    return `/uploads/${path}`;
  }
}
