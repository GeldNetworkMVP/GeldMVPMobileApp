import { Record } from '../models/record.model';

export type GetRecordByIdSuccessfulResponseDto = {
  Status: number;
  Response: Record[];
};
