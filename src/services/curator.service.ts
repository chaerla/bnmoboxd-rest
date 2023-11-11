import UserRepository, { GetCuratorDetailsOptions } from '@/repositories/user.repository';
import NotFound from '@errors/not-found.error';

class CuratorService {
  constructor(private readonly userRepository: UserRepository) {}

  getCurators = async options => {
    return await this.userRepository.getCurators(options);
  };

  getCuratorDetails = async (curatorUsername: string, options: GetCuratorDetailsOptions) => {
    const curatorDetails = await this.userRepository.getCuratorDetails(curatorUsername, options);
    if (!curatorDetails) {
      throw new NotFound();
    }
    return curatorDetails;
  };
}

export default CuratorService;
