import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import VerifySignature from "./helpers/VerifySignature";
import * as AWS from 'aws-sdk';
import Webhook from "./models/Webhook";
import NotificationProvider from './providers/NotificationProvider';
import ObjectStorageProvider from './providers/ObjectStorageProvider';
AWS.config.update({ region: 'eu-west-1' });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    var snsProvider = new NotificationProvider();
    var s3Provider = new ObjectStorageProvider();
    const webhookRequest = new Webhook(JSON.parse(event.body));
    s3Provider.recordObject(process.env.dumpbucket, `${webhookRequest.eventdata.event}/${webhookRequest.eventdata.id}`, event.body);
    if (!VerifySignature(webhookRequest.signature)) {
      throw new Error('Invalid key');
    }

    var eventText = JSON.stringify({
      Provider: 'Mailgun',
      timestamp: Date.now(),
      type: webhookRequest.eventdata.event
    }, null, 2);

    await snsProvider.pushNotification(eventText);

    return {
      statusCode: 200,
      body: JSON.stringify({
        Provider: 'Mailgun',
        timestamp: Date.now(),
        type: webhookRequest.eventdata.event
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
}