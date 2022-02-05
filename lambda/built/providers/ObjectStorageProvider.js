"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class ObjectStorageProvider {
    constructor() {
        this.client = new AWS.S3();
    }
    recordObject(s3bucket, s3key, body) {
        try {
            let result = false;
            const s3Request = {
                Body: body,
                Bucket: s3bucket,
                Key: `${new Date().getFullYear()}/${("0" + (new Date().getMonth() + 1)).slice(-2)}/${("0" + new Date().getDate()).slice(-2)}/${s3key}`
            };
            this.client.putObject(s3Request, (err, data) => {
                if (err)
                    throw Error(JSON.stringify(err));
                console.log(data);
                result = true;
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ObjectStorageProvider;
//# sourceMappingURL=ObjectStorageProvider.js.map