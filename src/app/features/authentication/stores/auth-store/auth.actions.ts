import { SignInResponseDto } from "@features/authentication/dto/sign-in.dto";

const AUTH_ACTION_KEY = '[Auth]';

export class SetLoginEmail {
  static readonly type = `${AUTH_ACTION_KEY} Set Login Email`;

  constructor(public email: string) {}
}


export class SetProfile {
  static readonly type = `${AUTH_ACTION_KEY} Set Profile`;
  constructor(public profile: Omit<SignInResponseDto, 'token'>) {}
}