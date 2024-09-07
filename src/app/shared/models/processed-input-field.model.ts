import { Record } from '@app/features/records/models/record.model';

export type ProcessedInputField =
  | ProcessedTextInputField
  | ProcessedSelectInputField;

export type ProcessedTextInputField = {
  id: string;
  name: string;
  label: string;
  valuekey: string;
  type: 'text';
};

export type ProcessedSelectInputField = {
  id: string;
  name: string;
  label: string;
  valuekey: string;
  type: 'select';
  options: Record[];
};
