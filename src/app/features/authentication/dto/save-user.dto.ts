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
  userid: string;
  username?: string;
  email: string;
  contact: string;
  designation: string;
  encpw?: string;
  status?: string;
}
