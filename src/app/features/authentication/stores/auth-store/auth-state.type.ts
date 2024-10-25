import { SignInResponseDto } from '@features/authentication/dto/sign-in.dto';

export interface AuthStateModel {
  loginEmail: string | null;
  profile: Omit<SignInResponseDto, 'token'> | null;
}
