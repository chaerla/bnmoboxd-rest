import prisma from '@/database/prisma';
import { VerificationStatus } from '@prisma/client';

interface GetVerificationOptions {
  page?: number;
  take?: number;
}
class UserVerificationRepository {
  getUserVerifications = async (options: GetVerificationOptions) => {
    const take = options.take || 10;
    const skip = options.page && options.page - 1 > 0 ? (options.page - 1) * take : 0;
    const count = await prisma.userVerification.count();
    const userVerifications = await prisma.userVerification.findMany({
      skip,
      take,
    });
    return { userVerifications, count };
  };

  updateUserVerification = async (userId: number, status: VerificationStatus) => {
    await prisma.userVerification.update({
      where: { userId },
      data: {
        status,
      },
    });
  };
}

export default UserVerificationRepository;
