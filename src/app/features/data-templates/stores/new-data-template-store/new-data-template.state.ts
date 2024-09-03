import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewDataTemplateStateModel } from './new-data-template-state.type';
import { SetNewDataTemplateBasicDetails } from './new-data-template.actions';

@State<NewDataTemplateStateModel>({
  name: 'newDataTemplate',
  defaults: {
    basicDetails: {
      name: 'DT0001',
      plot: {
        id: 'plo1',
        label: 'Plot 1',
      },
      workflow: {
        id: 'wf1',
        label: 'Workflow 1',
      },
    },
    plotOptions: [
      {
        id: 'plo1',
        label: 'Plot 1',
      },
      {
        id: 'plo2',
        label: 'Plot 2',
      },
      {
        id: 'plo3',
        label: 'Plot 3',
      },
      {
        id: 'plo4',
        label: 'Plot 4',
      },
    ],
    workflowOptions: [
      {
        id: 'wf1',
        label: 'Workflow 1',
      },
      {
        id: 'wf2',
        label: 'Workflow 2',
      },
      {
        id: 'wf3',
        label: 'Workflow 3',
      },
    ],
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
    return state.basicDetails?.plot?.label;
  }

  @Selector()
  static getWorkflowName(state: NewDataTemplateStateModel) {
    return state.basicDetails?.workflow?.label;
  }

  @Selector()
  static getPlotOptions(state: NewDataTemplateStateModel) {
    return state.plotOptions;
  }

  @Selector()
  static getWorkflowOptions(state: NewDataTemplateStateModel) {
    return state.workflowOptions;
  }

  // define actions
  @Action(SetNewDataTemplateBasicDetails)
  setNewDataTemplateBasicDetails(
    ctx: StateContext<NewDataTemplateStateModel>,
    action: SetNewDataTemplateBasicDetails
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      basicDetails: action.basicDetails,
    });
  }
}
