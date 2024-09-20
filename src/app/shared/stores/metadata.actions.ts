import { Plot } from '@app/features/plots/models/plot.model';
import { Workflow } from '@app/features/workflows/models/workflow.model';

const METADATA_ACTION_KEY = '[Metadata]';

export class SetAvailableWorkflows {
  static readonly type = `${METADATA_ACTION_KEY} Set Available Workflows`;

  constructor(public availableWorkflows: Workflow[]) {}
}

export class SetAvailablePlots {
  static readonly type = `${METADATA_ACTION_KEY} Set Available Plots`;

  constructor(public availablePlots: Plot[]) {}
}
