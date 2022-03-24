export class MenuItem {
  public description!: string;
  public imageUrl!: string;
  public name!: string;
  public price!: number;
  public sequenceNumber?: number;
  public thumbnailUrl?: string;
}

export class Menu {
  public items: MenuItem[] = [];
}
