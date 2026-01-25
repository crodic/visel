export interface StorageProvider {
  save(buffer: Buffer, path: string): Promise<void>;
  delete(path: string): Promise<void>;
  url(path: string): string;
}
