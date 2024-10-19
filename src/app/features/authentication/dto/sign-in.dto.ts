export interface SignInDto {
  email: string;
  pw: string;
}

export interface SignInResponseDto {
  token: string;
  company: string;
  contact: string;
  designation: string;
  email: string;
  userid: string
}
