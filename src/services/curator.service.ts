import UserRepository from '@/repositories/user.repository';

class CuratorService {
  constructor(private userRepository: UserRepository) {}

  getCurators = async options => {
    return await this.userRepository.getCurators(options);
  };
}

export default CuratorService;
