import { InputField } from '@shared/models/input-field.model';

import { Stage } from './stage.model';

export type StageWithInputFields = Stage & {
  fields: InputField[];
};
