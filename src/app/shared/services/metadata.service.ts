import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { first } from 'rxjs';

import { PlotsService } from '@app/features/plots/services/plots.service';
import { WorkflowsService } from '@app/features/workflows/services/workflows.service';

import {
  SetAvailableWorkflows,
  SetAvailablePlots,
} from '../stores/metadata.actions';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  store = inject(Store);

  workflowsService = inject(WorkflowsService);
  plotsService = inject(PlotsService);

  setMetadata() {
    this.plotsService
      .getAllPlots()
      .pipe(first())
      .subscribe((plots) => {
        this.store.dispatch(new SetAvailablePlots(plots.Response));
      });

    this.workflowsService
      .getAllWorkflows()
      .pipe(first())
      .subscribe((workflows) => {
        this.store.dispatch(new SetAvailableWorkflows(workflows));
      });
  }
}
