import { Record } from '../models/record.model';

export type GetRecordDetailsByIdSuccessfulResponseDto = {
  Status: number;
  Response: Record;
};
