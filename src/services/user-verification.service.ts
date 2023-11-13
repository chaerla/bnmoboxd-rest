import UserVerificationRepository from '@/repositories/user-verification.repository';
import { VerificationStatus } from '@prisma/client';
import NotFound from '@errors/not-found.error';
import BadRequest from '@errors/bad-request.error';

class UserVerificationService {
  constructor(private userVerificationRepository: UserVerificationRepository) {}

  // Return user with status
  getUserVerifications = async options => {
    return await this.userVerificationRepository.getUserVerifications(options);
  };

  getUserVerification = async (userId: number) => {
    const userVerification = await this.userVerificationRepository.getUserVerification(userId);
    if (!userVerification) {
      throw new NotFound();
    }
    return userVerification;
  };

  // Update user's status
  updateUserVerification = async (userId: number, status: VerificationStatus) => {
    const userVerification = await this.getUserVerification(userId);
    if (userVerification.status != 'PENDING') {
      throw new BadRequest('User is not pending verification');
    }
    await this.userVerificationRepository.updateUserVerification(userId, status);
  };
}

export default UserVerificationService;
