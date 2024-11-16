
export class User {
  items?: UserApiModel[];
  count!:number;
  total!:number;
}

export interface Iuser{
  user: UserApiModel;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export class UserApiModel {
  id: number;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  roles: string[];
  imageName?: string;
  active?: boolean;
}


