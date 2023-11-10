import prisma from '@/database/prisma';

export interface IInsertUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface GetUsersOptions {
  page?: number;
  take?: number;
}
class UserRepository {
  getUserById = async (id: number) => {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  };

  getUserByUsername = async (username: string) => {
    return await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        UserVerification: true,
      },
    });
  };

  getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  };

  addUser = async (data: IInsertUser) => {
    return await prisma.user.create({
      data: {
        ...data,
        UserVerification: {
          create: {
            status: 'PENDING',
          },
        },
      },
    });
  };

  getCurators = async (options: GetUsersOptions) => {
    const take = options.take || 10;
    const skip = options.page && options.page - 1 > 0 ? (options.page - 1) * take : 0;
    const where = {
      isAdmin: false,
    };
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          reviewCount: true,
        },
        where,
        skip,
        take,
      }),
      prisma.user.count({
        where,
      }),
    ]);
    return { users, count };
  };
}

export default UserRepository;
