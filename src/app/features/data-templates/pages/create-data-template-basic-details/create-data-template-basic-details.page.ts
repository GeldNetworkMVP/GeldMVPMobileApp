import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  plotOptions$ = this.store.select(NewDataTemplateState.getPlotOptions);
  workflowOptions$ = this.store.select(NewDataTemplateState.getWorkflowOptions);

  createDataTemplateBasicDetailsFormGroup = new FormGroup({
    dataTemplateName: new FormControl('', [Validators.required]),
    plot: new FormControl<{ id: string; label: string } | undefined>(
      undefined,
      [Validators.required]
    ),
    workflow: new FormControl<{ id: string; label: string } | undefined>(
      undefined,
      [Validators.required]
    ),
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
    return {
      name: value.dataTemplateName ?? undefined,
      plot: value.plot ?? undefined,
      workflow: value.workflow ?? undefined,
    };
  }
}
