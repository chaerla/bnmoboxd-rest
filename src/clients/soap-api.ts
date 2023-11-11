import { REST_API_KEY, SOAP_BASE_URL } from '@config';
import { createClient } from 'soap';
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
      console.log(result);
      return result?.return || null;
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  };

  private createSoapClient = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      createClient(url, (err: any, client: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(client);
        }
      });
    });
  };

  private invokeSoapFunction = (client: any, funcName: string, payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const header = {
        'x-api-key': REST_API_KEY,
      };

      client[funcName](
        payload,
        (err: any, result: any) => {
          if (err) {
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

  getAllSubscriptions = async () => {
    const funcName = 'getAll';
    const payload = {};

    const response = await this.postSubscriptionReq(funcName, payload);
    console.log(response);
    return response;
  };
}

export default SoapApi;
