"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const VerifySignature_1 = require("./helpers/VerifySignature");
const AWS = require("aws-sdk");
const Webhook_1 = require("./models/Webhook");
const NotificationProvider_1 = require("./providers/NotificationProvider");
const ObjectStorageProvider_1 = require("./providers/ObjectStorageProvider");
AWS.config.update({ region: 'eu-west-1' });
exports.lambdaHandler = async (event) => {
    try {
        var snsProvider = new NotificationProvider_1.default();
        var s3Provider = new ObjectStorageProvider_1.default();
        const webhookRequest = new Webhook_1.default(JSON.parse(event.body));
        s3Provider.recordObject(process.env.dumpbucket, `${webhookRequest.eventdata.event}/${webhookRequest.eventdata.id}`, event.body);
        if (!VerifySignature_1.default(webhookRequest.signature)) {
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
    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};
//# sourceMappingURL=App.js.map