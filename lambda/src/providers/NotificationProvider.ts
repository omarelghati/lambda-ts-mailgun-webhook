import * as AWS from 'aws-sdk';
export default class NotificationProvider {
    private client: AWS.SNS;
    constructor() {
        this.client = new AWS.SNS();
    }
    
    public async pushNotification(event:string): Promise<any> {
        var params = {
            Message: event,
            Subject: "Webhook Mailgun from Lambda",
            TopicArn: "arn:aws:sns:eu-west-1:327425435210:test-sns" // could be put in an env var as well
          };
          await this.client.publish(params).promise();
    }
}