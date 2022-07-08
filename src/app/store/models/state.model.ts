import { MenuOrder } from 'src/app/models/order';
import { User } from 'src/app/models/user';

export interface State {
    id: string;
    items: MenuOrder[];
    user: User;
    date: Date;
    total: number;
}
