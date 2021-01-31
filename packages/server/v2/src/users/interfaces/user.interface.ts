export enum UserRoles {
  customer = 'customer',
  caterer = 'caterer',
  admin = 'admin'
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  businessName: string;
  address: string;
  phoneNo: string;
  password: string;
  role: UserRoles;
}
