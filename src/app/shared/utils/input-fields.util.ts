import { Record } from '@app/features/records/models/record.model';

import { COUNTRY_CODES } from '../constants/country-codes.constant';
import {
  InputField,
  SelectInputField,
  TextInputField,
} from '../models/input-field.model';
import {
  ProcessedInputField,
  ProcessedSelectInputField,
  ProcessedTextInputField,
} from '../models/processed-input-field.model';

export function toHyphenatedString(str: string): string {
  return str.trim().split(' ').join('-').toLowerCase();
}

export function eachWordsFirstLetterCapitalized(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function isInputTextField(field: InputField): field is TextInputField {
  return field.valuetype === 'text';
}

export function isInputSelectField(
  field: InputField
): field is SelectInputField {
  return field.valuetype !== 'text';
}

export function isInputTextFieldByProcessedField(
  field: ProcessedInputField
): field is ProcessedTextInputField {
  return field.type === 'text';
}

export function isInputSelectFieldByProcessedField(
  field: ProcessedInputField
): field is ProcessedSelectInputField {
  return field.type === 'select';
}

export function inputTextFieldToProcessedInputField(
  field: TextInputField
): ProcessedInputField {
  return {
    id: toHyphenatedString(field.valuekey),
    name: toHyphenatedString(field.valuekey),
    label: eachWordsFirstLetterCapitalized(field.valuekey),
    type: 'text',
    valuekey: field.valuekey,
  };
}

export function inputSelectFieldToProcessedInputField(
  field: SelectInputField,
  recordValues: Record[]
): ProcessedInputField {
  return {
    id: toHyphenatedString(field.valuekey),
    name: toHyphenatedString(field.valuekey),
    type: 'select',
    options: recordValues,
    label: eachWordsFirstLetterCapitalized(field.valuekey),
    valuekey: field.valuekey,
  };
}

export function splitToCountryCodeAndNumber(contact: string) {
  let dialCode = '';
  let number = contact;

  for (let index = 0; index < COUNTRY_CODES.length; index++) {
    const countryCode = COUNTRY_CODES[index];
    if (contact.includes(countryCode)) {
      dialCode = countryCode;
      number = contact.slice(countryCode.length);
      break;
    }
  }

  return { dialCode, number };
}
