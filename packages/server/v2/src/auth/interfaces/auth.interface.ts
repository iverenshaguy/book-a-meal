import { User } from 'v2/src/users/user.model';

export interface AuthenticatedRequest extends Request {
  user: User
};
