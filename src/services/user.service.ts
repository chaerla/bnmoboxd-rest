import UserRepository from '@/repositories/user.repository';
import { RegisterDto } from '@/domain/dtos/register.dto';
import bcrypt from 'bcrypt';
import BadRequest from '@errors/bad-request.error';
import Unauthorized from '@errors/unauthorized.error';
import { LoginDto } from '@/domain/dtos/login.dto';
import NotFound from '@errors/not-found.error';
import { type User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import jwt from 'jsonwebtoken';
import redis from '@utils/redis';

class UserService {
  constructor(private userRepository: UserRepository) {}

  findUserByUsername = async (username: string) => {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new NotFound(`User with username ${username} not found`);
    }
    return user;
  };

  login = async ({ username, password }: LoginDto) => {
    const user = await this.findUserByUsername(username);
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized('Invalid Credentials');
    }

    if (user.UserVerification.status == 'PENDING') {
      throw new Unauthorized("We're still verifying your account");
    }

    if (user.UserVerification.status == 'REJECTED') {
      throw new Unauthorized('Your account is not eligible');
    }

    delete user.password;

    return { auth: { user, access_token: await this.generateToken(user) } };
  };

  register = async (registerDto: RegisterDto) => {
    if (await this.userRepository.getUserByUsername(registerDto.username)) {
      throw new BadRequest('Validation Error', { username: 'Username is already taken' });
    }
    if (await this.userRepository.getUserByEmail(registerDto.email)) {
      throw new BadRequest('Validation Error', { email: 'Email is already taken' });
    }

    const keys = await redis.keys(`userVerifications:*`);
    await redis.del(keys);

    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userRepository.addUser(registerDto);
    delete newUser.password;

    return { auth: { user: newUser, access_token: await this.generateToken(newUser) } };
  };

  generateToken = async (user: User) => {
    return await jwt.sign({ user }, SECRET_KEY);
  };
}

export default UserService;
