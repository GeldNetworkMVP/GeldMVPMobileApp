import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { NewDataTemplateStateModel } from './new-data-template-state.type';
import { SetNewDataTemplateBasicDetails } from './new-data-template.actions';

@State<NewDataTemplateStateModel>({
  name: 'newDataTemplate',
  defaults: {
    basicDetails: undefined,
  },
})
@Injectable()
export class NewDataTemplateState {
  // define selectors
  @Selector()
  static getBasicDetails(state: NewDataTemplateStateModel) {
    return state.basicDetails;
  }

  @Selector()
  static getDataTemplateName(state: NewDataTemplateStateModel) {
    return state.basicDetails?.name;
  }

  @Selector()
  static getPlotName(state: NewDataTemplateStateModel) {
    return state.basicDetails?.plot?.collectionname;
  }

  @Selector()
  static getWorkflowName(state: NewDataTemplateStateModel) {
    return state.basicDetails?.workflow?.workflowname;
  }

  @Selector()
  static getAvailableStagesToSelect(state: NewDataTemplateStateModel) {
    return state.basicDetails?.workflow?.stages ?? [];
  }

  // define actions
  @Action(SetNewDataTemplateBasicDetails)
  setNewDataTemplateBasicDetails(
    ctx: StateContext<NewDataTemplateStateModel>,
    action: SetNewDataTemplateBasicDetails
  ) {
    ctx.patchState({
      basicDetails: action.basicDetails,
    });
  }
}
