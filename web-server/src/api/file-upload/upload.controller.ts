import { AsyncUploadQueueService } from '@/api/file-upload/async-upload-queue.service';
import { ErrorCode } from '@/constants/error-code.constant';
import { ApiPublic } from '@/decorators/http.decorators';
import { ValidationException } from '@/exceptions/validation.exception';
import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadMultiple, UploadSingle } from './file-upload.decorator';
import { FileUploadService } from './file-upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly syncUpload: FileUploadService,
    private readonly asyncUpload: AsyncUploadQueueService,
  ) {}

  // ------------------------------
  // Sync Single Upload
  // ------------------------------
  @Post('sync')
  @ApiOperation({ summary: 'Upload 1 ảnh sync' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload + options',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'avatars' },
        sizes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'small' },
              width: { type: 'number', example: 200 },
            },
          },
        },
        generateThumbnail: { type: 'boolean', example: true },
        thumbnailWidth: { type: 'number', example: 250 },
      },
    },
  })
  @UploadSingle('file')
  @ApiResponse({ status: 201, description: 'Uploaded successfully' })
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.syncUpload.uploadImageWithStorage(file, {
      folder: 'avatars',
      sizes: [
        { name: 'small', width: 200 },
        { name: 'medium', width: 600 },
        { name: 'large', width: 1200 },
      ],
      generateThumbnail: true,
      thumbnailWidth: 250,
    });
  }

  // ------------------------------
  // Sync Multi Upload
  // ------------------------------
  @Post('multi')
  @ApiPublic({ summary: 'Upload nhiều ảnh sync' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Multi file upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          required: ['files[0]', 'files[1]'],
        },
        folder: { type: 'string', example: 'gallery' },
        sizes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'preview' },
              width: { type: 'number', example: 500 },
            },
          },
        },
      },
    },
  })
  @UploadMultiple('files')
  uploadMulti(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0 || files.length > 2)
      throw new ValidationException(ErrorCode.E001, 'No files provided');

    return this.syncUpload.uploadImages(files, {
      folder: 'gallery',
      sizes: [
        { name: 'preview', width: 500 },
        { name: 'full', width: 1500 },
      ],
    });
  }

  // ------------------------------
  // Async Upload (BullMQ)
  // ------------------------------
  @Post('async')
  @ApiOperation({ summary: 'Upload async qua queue BullMQ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload async',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'avatar' },
        sizes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'sm' },
              width: { type: 'number', example: 300 },
            },
          },
        },
        generateThumbnail: { type: 'boolean', example: true },
      },
    },
  })
  @UploadSingle('file')
  async uploadAsync(@UploadedFile() file: Express.Multer.File) {
    const job = await this.asyncUpload.uploadImage(file, {
      folder: 'avatars',
      sizes: [
        { name: 'sm', width: 300 },
        { name: 'md', width: 600 },
      ],
      generateThumbnail: true,
      thumbnailWidth: 250,
    });

    return {
      message: 'Upload job enqueued',
      jobId: job.jobId,
    };
  }

  // ------------------------------
  // Async Upload (BullMQ)
  // ------------------------------
  @Post('images/async')
  @ApiOperation({ summary: 'Upload async qua queue BullMQ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload async',
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
        folder: { type: 'string', example: 'avatar' },
        sizes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'sm' },
              width: { type: 'number', example: 300 },
            },
          },
        },
        generateThumbnail: { type: 'boolean', example: true },
      },
    },
  })
  @UploadMultiple('files', 2)
  async uploadImagesAsync(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.asyncUpload.uploadImages(files, {
      folder: 'avatars',
      sizes: [
        { name: 'sm', width: 300 },
        { name: 'md', width: 600 },
      ],
      generateThumbnail: true,
      thumbnailWidth: 250,
    });

    return {
      message: 'Upload job enqueued',
      jobId: job.jobId,
      results: job.files,
    };
  }

  @Post('docs')
  @ApiOperation({ summary: 'Upload file sync' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload + options',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'avatars' },
      },
    },
  })
  @UploadSingle('file')
  @ApiResponse({ status: 201, description: 'Uploaded successfully' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.syncUpload.uploadFile(file, {
      folder: 'docs',
      allowedMimeTypes: ['text/plain'],
      maxFileSize: 5 * 1024 * 1024,
    });
  }

  // ------------------------------
  // Async Upload (BullMQ)
  // ------------------------------
  @Post('file/async')
  @ApiOperation({ summary: 'Upload async qua queue BullMQ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload async',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'avatar' },
      },
    },
  })
  @UploadSingle('file')
  async uploadFileAsync(@UploadedFile() file: Express.Multer.File) {
    const job = await this.asyncUpload.uploadFile(file, {
      folder: 'files',
      rename: true,
      allowedMimeTypes: ['text/plain', 'application/pdf'],
      maxFileSize: 10 * 1024 * 1024,
    });

    return {
      message: 'Upload job enqueued',
      jobId: job.jobId,
    };
  }

  // ------------------------------
  // Async Upload (BullMQ)
  // ------------------------------
  @Post('files/async')
  @ApiOperation({ summary: 'Upload async qua queue BullMQ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload async',
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
        folder: { type: 'string', example: 'avatar' },
      },
    },
  })
  @UploadMultiple('files')
  async uploadFilesAsync(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.asyncUpload.uploadFiles(files, {
      folder: 'files',
      rename: true,
    });

    return {
      message: 'Upload job enqueued',
      jobId: job.jobId,
      results: job.files,
    };
  }
}
