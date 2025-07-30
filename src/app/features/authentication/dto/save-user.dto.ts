export interface SaveUserDto {
  username: string;
  email: string;
  contact: string;
  designation: string;
  encpw: string;
  status?: string;
}

export interface UpdateUserDto {
  _id: string;
  username?: string;
  email: string;
  contact: string;
  designation: string;
  encpw?: string;
  status?: string;
}

export interface GetUserDto {
  _id: string;
  username?: string;
  email: string;
  contact: string;
  designation: string;
  status?: string;
  company?: string;
  publickey: string;
}
