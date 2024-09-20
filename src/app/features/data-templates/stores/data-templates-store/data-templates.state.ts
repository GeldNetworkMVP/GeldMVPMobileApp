import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { DataTemplatesStateModel } from './data-templates-state.type';
import { SetDataTemplates } from './data-templates.actions';

@State<DataTemplatesStateModel>({
  name: 'dataTemplates',
  defaults: {
    templates: [],
  },
})
@Injectable()
export class DataTemplatesState {
  // define selectors
  @Selector()
  static getTemplates(state: DataTemplatesStateModel) {
    return state.templates;
  }

  // define actions
  @Action(SetDataTemplates)
  setDataTemplates(
    ctx: StateContext<DataTemplatesStateModel>,
    action: SetDataTemplates
  ) {
    ctx.patchState({
      templates: action.templates,
    });
  }
}
