import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';

import { StagesService } from '@features/stages/services/stages.service';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';
import { MetadataState } from '@shared/stores/metadata.state';

import { Workflow } from '@workflows/models/workflow.model';

import { Plot } from '@plots/models/plot.model';

import { SetNewDataTemplateBasicDetails } from '../../stores/new-data-template-store/new-data-template.actions';

@Component({
  selector: 'app-create-data-template-basic-details',
  styleUrls: ['./create-data-template-basic-details.page.scss'],
  templateUrl: './create-data-template-basic-details.page.html',
  standalone: true,
  imports: [
    ButtonComponent,
    IonContent,
    WithBackButtonLayoutComponent,
    InputTextModule,
    DropdownModule,
    ...commonModules,
  ],
})
export class CreateDataTemplateBasicDetailsPage implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly stagesService = inject(StagesService);

  availablePlots = this.store.selectSignal(MetadataState.getAvailablePlots);
  availableWorkflows = this.store.selectSignal(MetadataState.getAvailableWorkflows);

  createDataTemplateBasicDetailsFormGroup = new FormGroup({
    dataTemplateName: new FormControl('', [Validators.required]),
    plot: new FormControl<Plot | undefined>(undefined, [Validators.required]),
    workflow: new FormControl<Workflow | undefined>(undefined, [
      Validators.required,
    ]),
  });


  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      this.pageHeight.set(`calc(100vh - ${100 + statusBarHeight}px)`);
    });
  }

  async onSubmit() {
    const formData = await this.toCreateDataTemplateBasicDetailsFormData(
      this.createDataTemplateBasicDetailsFormGroup.value
    );
    this.store.dispatch(new SetNewDataTemplateBasicDetails(formData));
    this.router.navigate(['/data-templates/create/detailed']);
  }

  private async toCreateDataTemplateBasicDetailsFormData(
    value: typeof this.createDataTemplateBasicDetailsFormGroup.value
  ) {
    if (value.dataTemplateName && value.plot && value.workflow) {
      const workflow = value.workflow;
      const allStagesInWorkflow = workflow.stages;
      const existingStages =  await firstValueFrom(this.stagesService.getExistingStages(allStagesInWorkflow))
      workflow.stages = existingStages;
      return {
        name: value.dataTemplateName,
        plot: value.plot,
        workflow: workflow,
      };
    }
    return undefined;
  }
}
