"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class NotificationProvider {
    constructor() {
        this.client = new AWS.SNS();
    }
    async pushNotification(event) {
        var params = {
            Message: event,
            Subject: "Webhook Mailgun from Lambda",
            TopicArn: "arn:aws:sns:eu-west-1:327425435210:test-sns" // could be put in an env var as well
        };
        await this.client.publish(params).promise();
    }
}
exports.default = NotificationProvider;
//# sourceMappingURL=NotificationProvider.js.map