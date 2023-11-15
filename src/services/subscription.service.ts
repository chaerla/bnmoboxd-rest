import SoapApi from '@/clients/soap-api';
import ApplicationError from '@/errors/application.error';
import redis from '@utils/redis';

class SubscriptionService {
  private cacheKey = 'subscriptions';
  constructor(private readonly soapApi: SoapApi) {}
  // to do add options interface
  getSubscriptions = async options => {
    const optionsStr = JSON.stringify(options);
    const cacheKey = `${this.cacheKey}:${optionsStr}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`[SubscriptionService] Returning cached data: ${cachedData}`);
      return JSON.parse(cachedData);
    }

    console.log(`[SubscriptionService] Calling SOAP:getAll with options: ${optionsStr}`);
    const subscriptions = await this.soapApi.getAllSubscriptions(options);
    redis.set(`${this.cacheKey}:${optionsStr}`, JSON.stringify(subscriptions));
    return subscriptions;
  };

  putSubscription = async options => {
    const keys = await redis.keys(`${this.cacheKey}:*`);
    if(keys.length > 0) await redis.del(keys);

    console.log(`[SubscriptionService] Calling SOAP:update with options: ${JSON.stringify(options)}`);
    const success = await this.soapApi.updateSubscriptionStatus(options);
    if(!success) throw new ApplicationError();
  };
}

export default SubscriptionService;
