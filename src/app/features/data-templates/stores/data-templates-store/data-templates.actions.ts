import { DataTemplatesStateModel } from './data-templates-state.type';

const DATA_TEMPLATES_ACTION_KEY = '[NewDataTemplate]';

export class SetDataTemplates {
  static readonly type = `${DATA_TEMPLATES_ACTION_KEY} Set Data Templates`;

  constructor(public templates: DataTemplatesStateModel['templates']) {}
}