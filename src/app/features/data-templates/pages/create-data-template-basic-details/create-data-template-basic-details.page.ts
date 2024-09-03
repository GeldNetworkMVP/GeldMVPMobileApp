import { Component } from '@angular/core';
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
  plotOptions = [
    {
      id: 'plo1',
      label: 'Plot 1',
    },
    {
      id: 'plo2',
      label: 'Plot 2',
    },
    {
      id: 'plo3',
      label: 'Plot 3',
    },
    {
      id: 'plo4',
      label: 'Plot 4',
    },
  ];

  workflowOptions = [
    {
      id: 'wf1',
      label: 'Workflow 1',
    },
    {
      id: 'wf2',
      label: 'Workflow 2',
    },
    {
      id: 'wf3',
      label: 'Workflow 3',
    },
  ];

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
    console.log(formData);
  }

  private toCreateDataTemplateBasicDetailsFormData(
    value: typeof this.createDataTemplateBasicDetailsFormGroup.value
  ) {
    return {
      name: value.dataTemplateName,
      plot: value.plot?.id,
      workflow: value.workflow?.id,
    } as {
      name: string;
      plot: string;
      workflow: string;
    };
  }
}
