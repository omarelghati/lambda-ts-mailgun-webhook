"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Webhook {
    constructor(input) {
        this.signature = input.signature;
        this.eventdata = input['event-data'];
    }
}
exports.default = Webhook;
//# sourceMappingURL=Webhook.js.map