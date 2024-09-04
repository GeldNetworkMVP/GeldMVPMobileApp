import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MetadataStateModel } from './metadata-state.type';
import { SetAvailablePlots, SetAvailableWorkflows } from './metadata.actions';
import { Injectable } from '@angular/core';

@State<MetadataStateModel>({
  name: 'metadata',
  defaults: {
    availableWorkflows: [],
    availablePlots: [],
  },
})
@Injectable({
  providedIn: 'root',
})
export class MetadataState {
  @Selector()
  static getAvailableWorkflows(state: MetadataStateModel) {
    return state.availableWorkflows;
  }

  @Selector()
  static getAvailablePlots(state: MetadataStateModel) {
    return state.availablePlots;
  }

  @Action(SetAvailableWorkflows)
  setAvailableWorkflows(
    ctx: StateContext<MetadataStateModel>,
    { availableWorkflows }: SetAvailableWorkflows
  ) {
    ctx.patchState({
      availableWorkflows,
    });
  }

  @Action(SetAvailablePlots)
  setAvailablePlots(
    ctx: StateContext<MetadataStateModel>,
    { availablePlots }: SetAvailablePlots
  ) {
    ctx.patchState({
      availablePlots,
    });
  }
}
