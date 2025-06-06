import { Plot } from '@app/features/plots/models/plot.model';
import { Workflow } from '@app/features/workflows/models/workflow.model';

export type NewDataTemplateStateModel = {
  basicDetails:
    | {
        name: string;
        plot: Plot;
        workflow: Workflow;
      }
    | undefined;
};
