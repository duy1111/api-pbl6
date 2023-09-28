import { plainToInstance } from 'class-transformer';

export const introShownFields = {
  yearOfBirth: true,
  bodyType: true,
  diet: true,
  drinks: true,
  drugs: true,
  education: true,
  ethnicity: true,
  height: true,
  income: true,
  job: true,
  location: true,
  offspring: true,
  pets: true,
  sign: true,
  smokes: true,
  speaks: true,
  email: true,
  phoneNumber: true,
};

export const sensitiveFields = [
  'cluster',
  'isActivated',
  'isDeleted',
  'verifyAt',
  'premiumEndsAt',
  'createdAt',
  'updatedAt',
  'lastOnline',
  'role',
];

export const ErrorMessages = {
  AUTH: {
    USER_INACTIVE: 'This user has been deactivated',
    CREDENTIALS_INCORRECT: 'Credentials incorrect',
    INVALID_TOKEN: 'Invalid token',
  },
  PLATFORM: {
    PLATFORM_NOT_FOUND: 'Platform not found',
  },
  CONTACT: {
    CONTACT_NOT_FOUND: 'Contact not found',
  },
  USER: {
    USER_NOT_FOUND: 'User not found',
    USER_INVALID: 'User invalid',
    USER_INACTIVE: 'Please activate this user first',
    USER_IMAGE_NOT_EXIST: 'Image not found',
  },
};

export const APISummaries = {
  UNAUTH: 'No token required',
  USER: 'User permission required',
  ADMIN: 'Admin permission required',
};

export enum TypeContact {
  PHONE_NUMBER,
  EMAIL,
}

export function genRandomString(length = 6): string {
  let random = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength: number = characters.length;
  let counter = 0;

  while (counter < length) {
    random += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return random;
}

export function PlainToInstance(model: any, response: any): any {
  return plainToInstance(model, response, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    strategy: 'excludeAll',
  });
}
