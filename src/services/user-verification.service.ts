import UserVerificationRepository from '@/repositories/user-verification.repository';
import { VerificationStatus } from '@prisma/client';

class UserVerificationService {
  constructor(private userVerificationRepository: UserVerificationRepository) {}

  // Return user with status
  getUserVerifications = async options => {
    return await this.userVerificationRepository.getUserVerifications(options);
  };

  // Update user's status
  updateUserVerification = async (userId: number, status: VerificationStatus) => {
    await this.userVerificationRepository.updateUserVerification(userId, status);
  };
}

export default UserVerificationService;
