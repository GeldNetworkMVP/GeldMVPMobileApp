import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';
import { IonContent } from '@ionic/angular/standalone';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { commonModules } from '@app/shared/common.modules';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { NewDataTemplateStateModel } from '../../stores/new-data-template-store/new-data-template-state.type';
import { Store } from '@ngxs/store';
import { SetNewDataTemplateBasicDetails } from '../../stores/new-data-template-store/new-data-template.actions';
import { Router } from '@angular/router';
import { NewDataTemplateState } from '../../stores/new-data-template-store/new-data-template.state';
import { MetadataState } from '@app/shared/stores/metadata.state';
import { Workflow } from '@app/features/workflows/models/workflow.model';
import { Plot } from '@app/features/plots/models/plot.model';

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
export class CreateDataTemplateBasicDetailsPage {
  store = inject(Store);
  router = inject(Router);

  availablePlots$ = this.store.select(MetadataState.getAvailablePlots);
  availableWorkflows$ = this.store.select(MetadataState.getAvailableWorkflows);

  createDataTemplateBasicDetailsFormGroup = new FormGroup({
    dataTemplateName: new FormControl('', [Validators.required]),
    plot: new FormControl<Plot | undefined>(undefined, [Validators.required]),
    workflow: new FormControl<Workflow | undefined>(undefined, [
      Validators.required,
    ]),
  });

  onSubmit() {
    const formData = this.toCreateDataTemplateBasicDetailsFormData(
      this.createDataTemplateBasicDetailsFormGroup.value
    );
    this.store.dispatch(new SetNewDataTemplateBasicDetails(formData));
    this.router.navigate(['/data-templates/create/detailed']);
  }

  private toCreateDataTemplateBasicDetailsFormData(
    value: typeof this.createDataTemplateBasicDetailsFormGroup.value
  ) {
    console.log(value);
    if (value.dataTemplateName && value.plot && value.workflow) {
      return {
        name: value.dataTemplateName,
        plot: value.plot,
        workflow: value.workflow,
      };
    }
    return undefined;
  }
}
