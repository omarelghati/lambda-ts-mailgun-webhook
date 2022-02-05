import * as AWS from 'aws-sdk';
export default class ObjectStorageProvider {
    private client: AWS.S3;
    constructor() {
        this.client = new AWS.S3();
    }

    public recordObject(s3bucket: string, s3key: string, body: string): Boolean {
        try {
            let result = false;
            const s3Request = {
                Body: body,
                Bucket: s3bucket,
                Key: `${new Date().getFullYear()}/${("0" + (new Date().getMonth() + 1)).slice(-2)}/${("0" + new Date().getDate()).slice(-2)}/${s3key}`
            };
            this.client.putObject(s3Request, (err, data) => {
                if (err) throw Error(JSON.stringify(err));
                console.log(data);
                result = true;
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}