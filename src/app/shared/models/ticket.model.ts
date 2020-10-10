import { User } from './user.model';

export class Ticket {
  id: string;
  number: number;
  title: string;
  status: string;
  priority: string;
  imagem: string;
  user: User;
  assignedUser: User;
  data: string;
  changes: Array<string>;
}
