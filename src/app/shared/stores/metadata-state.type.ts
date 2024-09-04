import { Plot } from '@app/features/plots/models/plot.model';
import { Workflow } from '@app/features/workflows/models/workflow.model';

export type MetadataStateModel = {
  availableWorkflows: Workflow[];
  availablePlots: Plot[];
};
