export type ImageFormat = 'jpeg' | 'png' | 'webp';

export interface ImageSizeOption {
  name: string;
  width: number;
  height?: number;
}

export interface UploadImageOptions {
  folder?: string;
  format?: ImageFormat;
  quality?: number;
  compress?: boolean;
  withName?: string;
  sizes?: ImageSizeOption[];
  generateThumbnail?: boolean;
  thumbnailWidth?: number;
  maxFileSize?: number;
  allowedMimeTypes?: string[];
}

export interface UploadFileOptions {
  folder?: string;
  rename?: boolean;
  maxFileSize?: number;
  allowedMimeTypes?: string[];
}
