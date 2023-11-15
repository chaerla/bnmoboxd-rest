import SoapApi from '@/clients/soap-api';
import ApplicationError from '@/errors/application.error';
import redis from '@utils/redis';

class SubscriptionService {
  private cacheKey = 'subscriptions';
  constructor(private readonly soapApi: SoapApi) {}
  // to do add options interface
  getSubscriptions = async options => {
    const optionsStr = JSON.stringify(options);

    console.log(`[SubscriptionService] Calling SOAP:getAll with options: ${optionsStr}`);
    const subscriptions = await this.soapApi.getAllSubscriptions(options);
    redis.set(`${this.cacheKey}:${optionsStr}`, JSON.stringify(subscriptions));
    return subscriptions;
  };

  putSubscription = async options => {
    console.log(`[SubscriptionService] Calling SOAP:update with options: ${JSON.stringify(options)}`);
    const success = await this.soapApi.updateSubscriptionStatus(options);
    if (!success) throw new ApplicationError();
  };

  getSubscriptionCount = async (curatorUsername: string) => {
    const count = await this.soapApi.getSubscriberCount(curatorUsername);
    return count;
  };
}

export default SubscriptionService;
