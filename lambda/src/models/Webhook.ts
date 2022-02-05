export default class Webhook {
    public signature: any;
    public eventdata: any;
    constructor(input: any) {
        this.signature = input.signature;
        this.eventdata = input['event-data'];
    }
}