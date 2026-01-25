export interface ImageProcessor {
  process(
    file: Express.Multer.File,
    format: string,
    quality: number,
  ): Promise<Buffer>;

  resize(
    buffer: Buffer,
    width: number,
    format: string,
    quality: number,
  ): Promise<Buffer>;
}
