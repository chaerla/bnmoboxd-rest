import { SOAP_API_KEY, SOAP_BASE_URL } from '@config';
import { Client, createClient } from 'soap';
import ApplicationError from '@errors/application.error';

class SoapApi {
  private BASE_URL = SOAP_BASE_URL;
  private SUBSCRIPTION_ENDPOINT = '/subscription';
  constructor() {}
  private postSubscriptionReq = async (funcName: string, payload: any) => {
    try {
      const url = `${this.BASE_URL}${this.SUBSCRIPTION_ENDPOINT}?wsdl`;
      const client = await this.createSoapClient(url);
      const result = await this.invokeSoapFunction(client, funcName, payload);
      return result?.response || null;
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  };

  private createSoapClient = (url: string): Promise<Client> => {
    return new Promise((resolve, reject) => {
      createClient(url, (err: any, client: Client) => {
        if (err) {
          reject(err);
        } else {
          resolve(client);
        }
      });
    });
  };

  private invokeSoapFunction = (client: Client, funcName: string, payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const header = {
        'x-api-key': SOAP_API_KEY,
      };

      client[funcName](
        payload,
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        },
        null,
        header,
      );
    });
  };

  getAllSubscriptions = async options => {
    const funcName = 'getAll';

    const response = await this.postSubscriptionReq(funcName, options);
    console.log(`[SoapApi] Response from SOAP API: ${JSON.stringify(response)}`);
    return response;
  };

  updateSubscriptionStatus = async options => {
    const funcName = 'update';
    
    const response = await this.postSubscriptionReq(funcName, options);
    console.log(`[SoapApi] Response from SOAP API: ${JSON.stringify(response)}`);
    return response;
  };
}

export default SoapApi;
