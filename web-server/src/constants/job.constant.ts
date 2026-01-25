export enum QueueName {
  EMAIL = 'email',
  UPLOAD = 'upload',
}

export enum QueuePrefix {
  AUTH = 'auth',
}

export enum JobName {
  EMAIL_VERIFICATION = 'email-verification',
  EMAIL_FORGOT_PASSWORD = 'email-forgot-password',

  UPLOAD_IMAGE = 'upload-image',
  UPLOAD_IMAGES = 'upload-images',

  UPLOAD_FILE = 'upload-file',
  UPLOAD_FILES = 'upload-files',
}
