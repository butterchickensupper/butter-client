export class OrderHistoryRequest {
  public startDate?: Date;
  public endDate?: Date;
  public userId?: string;

  constructor(args: { startDate?: Date; endDate?: Date; userId?: string }) {
    this.startDate = args.startDate;
    this.endDate = args.endDate;
    this.userId = args.userId;
  }
}
