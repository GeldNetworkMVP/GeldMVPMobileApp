import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';

import { CheckUserExistenceResponseDto } from '../dto/check-user-existence-response.dto';
import { SaveUserDto } from '../dto/save-user.dto';
import { SignInDto, SignInResponseDto } from '../dto/sign-in.dto';
import { SetProfile } from '../stores/auth-store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;
  private store = inject(Store);

  http = inject(HttpClient);

  registerUser(dto: SaveUserDto) {
    return this.http.post(`${this.apiUrl}/appuser/save`, dto);
  }

  doesUserExist(email: string) {
    return this.http.get<CheckUserExistenceResponseDto>(
      `${this.apiUrl}/userexists/${email}`
    );
  }

  login(dto: SignInDto) {
    return this.http
      .post<SignInResponseDto>(`${this.apiUrl}/usersignin`, dto)
      .pipe(
        tap(async (response) => {
          if (response.token)
            // await Preferences.set({ key: 'token', value: response.token });
            this.store.dispatch(new SetProfile(response));
          const keys = Object.keys(response) as (keyof SignInResponseDto)[];
          for (const key of keys) {
            await Preferences.set({ key, value: response[key] });
          }
        })
      );
  }
}
