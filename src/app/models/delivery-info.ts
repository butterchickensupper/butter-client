export class DeliveryInfo {
    public addressId?: string;
    public sameAsBilling!: boolean;
    public address!: string;
    public city!: string;
    public state!: string;
    public zip!: string;

    constructor(args: { sameAsBilling: boolean; address: string; city: string; state: string; zip: string }) {
        this.sameAsBilling = args.sameAsBilling;
        this.address = args.address;
        this.city = args.city;
        this.state = args.state;
        this.zip = args.zip;
    }
}
