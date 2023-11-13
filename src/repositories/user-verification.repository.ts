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
    const where = {
      User: {
        isAdmin: false,
      },
    };
    const count = await prisma.userVerification.count({
      where,
    });
    const userVerifications = await prisma.userVerification.findMany({
      select: {
        User: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        status: true,
      },
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { userVerifications, count };
  };

  getUserVerification = async (userId: number) => {
    return await prisma.userVerification.findFirst({
      where: {
        userId,
      },
    });
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
