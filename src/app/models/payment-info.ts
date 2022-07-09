export class PaymentInfo {
    public cardNumber: string;
    public expirationDate: Date;
    public securityCode: string;

    constructor(args: { cardNumber: string; expirationDate: Date; securityCode: string }) {
        this.cardNumber = args.cardNumber;
        this.expirationDate = args.expirationDate;
        this.securityCode = args.securityCode;
    }
}
