import { NewDataTemplateStateModel } from './new-data-template-state.type';

export class SetNewDataTemplateBasicDetails {
  static readonly type =
    '[NewDataTemplate] Set New Data Template Basic Details';

  constructor(public basicDetails: NewDataTemplateStateModel['basicDetails']) {}
}
