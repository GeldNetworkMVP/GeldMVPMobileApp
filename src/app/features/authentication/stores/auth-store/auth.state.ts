import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthStateModel } from './auth-state.type';
import { SetLoginEmail, SetProfile } from './auth.actions';

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loginEmail: null,
    profile: null,
  },
})
export class AuthState {
  // define selectors
  @Selector()
  static getLoginEmail(state: AuthStateModel) {
    return state.loginEmail;
  }

  @Selector()
  static getProfile(state: AuthStateModel) {
    return state.profile;
  }

  // define actions
  @Action(SetLoginEmail)
  setAuth(ctx: StateContext<AuthStateModel>, action: SetLoginEmail) {
    ctx.patchState({
      loginEmail: action.email,
    });
  }

  // define actions
  @Action(SetProfile)
  setProfile(ctx: StateContext<AuthStateModel>, action: SetProfile) {
    ctx.patchState({
      profile: action.profile,
    });
  }
}
