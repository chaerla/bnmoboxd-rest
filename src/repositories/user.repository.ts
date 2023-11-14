import prisma from '@/database/prisma';
import { GetReviewsOptions } from '@/repositories/curator-review.repository';

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

export type GetCuratorDetailsOptions = GetReviewsOptions & {
  reviews: 'true' | 'false';
};

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
    const [curators, count] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          username: true,
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
    return { curators, count };
  };

  async getCuratorDetails(curatorUsername: string, options: GetCuratorDetailsOptions) {
    const where = {
      isAdmin: false,
      username: curatorUsername,
    };
    console.log(where);
    const take = options.take || 10;
    const skip = options.page && options.page - 1 > 0 ? (options.page - 1) * take : 0;
    const select = {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      reviewCount: true,
    };

    if (options.reviews === 'true') {
      select['Review'] = {
        take,
        skip,
        orderBy: {
          createdAt: 'DESC',
        },
      };
    }

    return await prisma.user.findFirst({
      select,
      where,
    });
  }
}

export default UserRepository;
