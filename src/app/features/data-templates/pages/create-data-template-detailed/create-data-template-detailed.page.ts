import { Component, inject, OnInit, signal } from '@angular/core';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { NewDataTemplateState } from '../../stores/new-data-template-store/new-data-template.state';
import { first, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { commonModules } from '@app/shared/common.modules';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { StagesService } from '@app/features/stages/services/stages.service';
import { ProcessedInputField } from '@app/shared/models/processed-input-field.model';
import { StageWithInputFields } from '@app/features/stages/models/stage-with-input-fields.model';
import {
  inputSelectFieldToProcessedInputField,
  inputTextFieldToProcessedInputField,
  isInputSelectFieldByProcessedField,
  isInputTextField,
  isInputTextFieldByProcessedField,
} from '@app/shared/utils/input-fields.util';
import { RecordsService } from '@app/features/records/services/records.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Record } from '@app/features/records/models/record.model';

@Component({
  selector: 'app-create-data-template-detailed',
  styleUrls: ['./create-data-template-detailed.page.scss'],
  templateUrl: './create-data-template-detailed.page.html',
  standalone: true,
  imports: [
    DropdownModule,
    SkeletonModule,
    InputTextModule,
    ButtonComponent,
    IonContent,
    WithBackButtonLayoutComponent,
    ...commonModules,
  ],
})
export class CreateDataTemplateDetailedPage implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly stagesService = inject(StagesService);
  private readonly recordsService = inject(RecordsService);

  // function references
  isInputTextFieldByProcessedField = isInputTextFieldByProcessedField;
  isInputSelectFieldByProcessedField = isInputSelectFieldByProcessedField;

  // selectors
  basicDetails$ = this.store.select(NewDataTemplateState.getBasicDetails);
  dataTemplateName$ = this.store.select(
    NewDataTemplateState.getDataTemplateName
  );
  plotName$ = this.store.select(NewDataTemplateState.getPlotName);
  workflowName$ = this.store.select(NewDataTemplateState.getWorkflowName);
  availableStagesToSelect$ = this.store.select(
    NewDataTemplateState.getAvailableStagesToSelect
  );

  destroy$ = new Subject();

  // form
  formGroup = signal<FormGroup>(
    this.formBuilder.group({
      stage: [null, Validators.required],
    })
  );
  constructingForm = signal(false);
  dynamicFormFields = signal<ProcessedInputField[]>([]);

  ngOnInit() {
    this.basicDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((basicDetails) => {
        if (!basicDetails) {
          this.router.navigate(['/data-templates/create/basic-details']);
        }
      });
  }

  onSelectStage({ value }: DropdownChangeEvent) {
    if (typeof value === 'string') {
      this.constructingForm.set(true);
      this.stagesService
        .getStageByName(value)
        .pipe(first())
        .subscribe(async (stage) => {
          const processedFields = await this.processInputFields(stage.Response);
          console.log(processedFields);
          this.dynamicFormFields.set(processedFields);
          this.updateFormGroup(processedFields);
          this.constructingForm.set(false);
        });
    }
  }

  async processInputFields(
    stage: StageWithInputFields
  ): Promise<ProcessedInputField[]> {
    const rawFields = stage.fields;
    const processedFields: ProcessedInputField[] = [];
    for (const field of rawFields) {
      if (isInputTextField(field)) {
        processedFields.push(inputTextFieldToProcessedInputField(field));
      } else if (typeof field.valuetype === 'string') {
        const recordId = field.valuetype;
        try {
          const recordResponse = await firstValueFrom(
            this.recordsService.getRecordById(recordId)
          );
          const recordValues = recordResponse.Response;
          processedFields.push(
            inputSelectFieldToProcessedInputField(field, recordValues)
          );
        } catch (error) {
          console.error(`Error fetching record with ID ${recordId}:`, error);
        }
      }
    }
    return processedFields;
  }

  updateFormGroup(processedFields: ProcessedInputField[]) {
    const formGroup = this.formGroup();
    if (formGroup) {
      for (const field of processedFields) {
        formGroup.addControl(
          field.valuekey,
          new FormControl(null, Validators.required)
        );
      }

      // delete the form control that is not in the processed fields, but keep stage
      const formControlNames = Object.keys(formGroup.controls);
      for (const formControlName of formControlNames) {
        if (
          formControlName !== 'stage' &&
          !processedFields.some((field) => field.valuekey === formControlName)
        ) {
          formGroup.removeControl(formControlName);
        }
      }

      // console.log all the form controls
      console.log(formGroup.controls);
      this.formGroup.set(formGroup);
    }
  }

  onValueChange(event: DropdownChangeEvent, valuekey: string) {
    const record = event.value as Record;
  }

  onSubmit() {
    // show the values of the form group
    console.log(this.formGroup().value);
  }
}
