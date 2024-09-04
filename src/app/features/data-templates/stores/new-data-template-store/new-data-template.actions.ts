import { NewDataTemplateStateModel } from './new-data-template-state.type';

const NEW_DATA_TEMPLATE_ACTION_KEY = '[NewDataTemplate]';

export class SetNewDataTemplateBasicDetails {
  static readonly type = `${NEW_DATA_TEMPLATE_ACTION_KEY} Set New Data Template Basic Details`;

  constructor(public basicDetails: NewDataTemplateStateModel['basicDetails']) {}
}
