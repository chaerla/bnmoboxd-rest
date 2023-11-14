import SoapApi from '@/clients/soap-api';
import redis from '@utils/redis';

class SubscriptionService {
  private cacheKey = 'subscriptions';
  constructor(private readonly soapApi: SoapApi) {}
  // to do add options interface
  getSubscriptions = async options => {
    const cacheKey = `${this.cacheKey}:${JSON.stringify(options)}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    await this.soapApi.getAllSubscriptions();
    console.log(options);
    // to do : call soap api
    return {
      subscriptions: [
        {
          curatorUsername: 'Curator 1',
          subscriberUsername: 'User 1',
          status: 'PENDING',
        },
        {
          curatorUsername: 'Curator 2',
          subscriberUsername: 'User 2',
          status: 'ACCEPTED',
        },
        {
          curatorUsername: 'Curator 3',
          subscriberUsername: 'User 3',
          status: 'REJECTED',
        },
        {
          curatorUsername: 'Curator 4',
          subscriberUsername: 'User 4',
          status: 'REJECTED',
        },
        {
          curatorUsername: 'Curator 5',
          subscriberUsername: 'User 5',
          status: 'REJECTED',
        },
        {
          curatorUsername: 'Curator 6',
          subscriberUsername: 'User 6',
          status: 'PENDING',
        },
        {
          curatorUsername: 'Curator 7',
          subscriberUsername: 'User 7',
          status: 'ACCEPTED',
        },
        {
          curatorUsername: 'Curator 8',
          subscriberUsername: 'User 8',
          status: 'PENDING',
        },
      ],
      count: 8,
    };
  };

  putSubscription = async payload => {
    const keys = await redis.keys(`${this.cacheKey}:*`);
    await redis.del(keys);

    await this.soapApi.updateSubscriptionStatus();
    console.log(payload);
    // call to soap to update subs status
    return {
      curatorUsername: 'Curator 8',
      subscriberUsername: 'User 8',
      status: 'PENDING',
    };
  };
}

export default SubscriptionService;
