import UserVerificationRepository from '@/repositories/user-verification.repository';
import UserRepository from '@/repositories/user.repository';
import { VerificationStatus } from '@prisma/client';

class UserVerificationService {
  constructor(
    private userVerificationRepository: UserVerificationRepository,
    private userRepository: UserRepository,
  ) {}

  // Return user with status
  getUsers = async options => {
    const user = await this.userVerificationRepository.getUserVerifications(options);

    // user.forEach(async element => {
    //   await this.userRepository.getUserById(element.user_id);
    // });
    return user;
  };

  // Update user's status
  updateUser = async (userId: number, status: VerificationStatus) => {
    await this.userVerificationRepository.updateUserVerification(userId, status);
  };
}

export default UserVerificationService;
