// import { Injectable } from '@nestjs/common';
// import { S3 } from 'aws-sdk';
// import { StorageProvider } from './storage-provider.interface';

// @Injectable()
// export class S3StorageProvider implements StorageProvider {
//   private readonly s3 = new S3({ region: process.env.AWS_REGION });
//   private readonly bucket = process.env.AWS_BUCKET;

//   async save(buffer: Buffer, path: string) {
//     await this.s3
//       .upload({
//         Bucket: this.bucket,
//         Key: path,
//         Body: buffer,
//         ACL: 'public-read',
//       })
//       .promise();
//   }

//   async delete(path: string) {
//     await this.s3.deleteObject({ Bucket: this.bucket, Key: path }).promise();
//   }

//   url(path: string) {
//     return `https://${this.bucket}.s3.amazonaws.com/${path}`;
//   }
// }
