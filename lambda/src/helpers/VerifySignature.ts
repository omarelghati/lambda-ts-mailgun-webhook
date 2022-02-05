import * as crypto from 'crypto';

export default (signature: any) => {
    const encodedToken = crypto
        .createHmac('sha256', process.env.signingKey)
        .update(signature.timestamp.concat(signature.token))
        .digest('hex')

    if (encodedToken !== signature.signature) {
        throw new Error('Token invalid')
    }

    return true;
}