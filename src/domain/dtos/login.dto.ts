import { VerificationStatus } from '@prisma/client';

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthTokenDto {
  id: number;
  username: string;
  isAdmin: boolean;
  UserVerification?: {
    status: VerificationStatus;
  };
}
