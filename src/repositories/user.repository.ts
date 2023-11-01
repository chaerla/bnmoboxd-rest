import prisma from '@/database/prisma';

export interface IInsertUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
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
      data,
    });
  };
}

export default UserRepository;
