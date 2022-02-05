"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
exports.default = (signature) => {
    const encodedToken = crypto
        .createHmac('sha256', process.env.signingKey)
        .update(signature.timestamp.concat(signature.token))
        .digest('hex');
    if (encodedToken !== signature.signature) {
        throw new Error('Token invalid');
    }
    return true;
};
//# sourceMappingURL=VerifySignature.js.map