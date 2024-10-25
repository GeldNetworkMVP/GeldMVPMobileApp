import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';

import { GetDataTemplatesOfLoggedInUserSuccessfulResponseDto } from '@data-templates/dto/get-data-templates-of-logged-in-user-successful-response.dto';

import { AuthState } from '@features/authentication/stores/auth-store/auth.state';

@Injectable({ providedIn: 'root' })
export class DataTemplatesService {
  private readonly apiUrl = environment.apiUrl;
  private readonly store = inject(Store);

  http = inject(HttpClient);

  getDataTemplatesOfLoggedInUser() {
    const profile = this.store.selectSnapshot(AuthState.getProfile);
    return this.http.get<GetDataTemplatesOfLoggedInUserSuccessfulResponseDto>(
      `${this.apiUrl}/geldtemplate/user/${profile?.userid}`
    );
  }
  saveDataTemplate(templateData: any) {
    return this.http.post(`${this.apiUrl}/geldtemplate/save`, templateData);
  }
}
