export class BillingInfo {
    public addressId?: string;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public city!: string;
    public state!: string;
    public zip!: string;

    constructor(args: { firstName: string; lastName: string; address: string; city: string; state: string; zip: string }) {
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.address = args.address;
        this.city = args.city;
        this.state = args.state;
        this.zip = args.zip;
    }
}
