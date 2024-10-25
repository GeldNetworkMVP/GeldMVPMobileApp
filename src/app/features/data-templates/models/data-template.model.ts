import { Plot } from "@features/plots/models/plot.model";
import { Stage } from "@features/stages/models/stage.model";
import { Workflow } from "@features/workflows/models/workflow.model";

export type DataTemplate = {
  _id: string;
  currentHash: null | string;
  plot: Plot;
  prevHash: null | string;
  templateHash: string;
  templatename: string;
  timestamp: number;
  userid: string;
  workflow: Workflow;
  stage: Stage
  geocoordinates: {
    latitude: number;
    longitude: number;
  }
};
