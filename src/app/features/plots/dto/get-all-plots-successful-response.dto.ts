import { Plot } from "../models/plot.model";

export type GetAllPlotsSuccessfulResponseDto = {
  Status: number;
  Response: Plot[]
};