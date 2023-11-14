import UserVerificationRepository, { GetVerificationOptions } from '@/repositories/user-verification.repository';
import { VerificationStatus } from '@prisma/client';
import NotFound from '@errors/not-found.error';
import BadRequest from '@errors/bad-request.error';
import redis from '@utils/redis';

class UserVerificationService {
  private cacheKey = 'userVerifications';
  constructor(private userVerificationRepository: UserVerificationRepository) {}

  // Return user with status
  getUserVerifications = async (options: GetVerificationOptions) => {
    const cacheKey = `${this.cacheKey}:${JSON.stringify(options)}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const verifications = await this.userVerificationRepository.getUserVerifications(options);
    await redis.setex(cacheKey, 3600, JSON.stringify(verifications));
    return verifications;
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
    const keys = await redis.keys(`${this.cacheKey}:*`);
    await redis.del(keys);

    const userVerification = await this.getUserVerification(userId);
    if (userVerification.status != 'PENDING') {
      throw new BadRequest('User is not pending verification');
    }
    await this.userVerificationRepository.updateUserVerification(userId, status);
  };
}

export default UserVerificationService;
