import { Component, inject, signal, effect, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { SafeArea } from 'capacitor-plugin-safe-area';
import config from 'capacitor.config';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { first, firstValueFrom, Subject } from 'rxjs';

import { DataTemplatesService } from '@data-templates/services/data-templates.service';

import { AuthState } from '@features/authentication/stores/auth-store/auth.state';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';
import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';
import { ProcessedInputField } from '@shared/models/processed-input-field.model';
import { BlockchainService } from '@shared/services/blockchain.service';
import { UtilsService } from '@shared/services/utils.service';
import {
  inputSelectFieldToProcessedInputField,
  inputTextFieldToProcessedInputField,
  isInputSelectFieldByProcessedField,
  isInputTextField,
  isInputTextFieldByProcessedField,
} from '@shared/utils/input-fields.util';

import { StageWithInputFields } from '@stages/models/stage-with-input-fields.model';
import { StagesService } from '@stages/services/stages.service';

import { RecordsService } from '@records/services/records.service';

import { NewDataTemplateState } from '../../stores/new-data-template-store/new-data-template.state';

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
    ProgressSpinnerModule,
    WithBackButtonLayoutComponent,
    ...commonModules,
  ],
  providers: [MessageService],
})
export class CreateDataTemplateDetailedPage implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly stagesService = inject(StagesService);
  private readonly recordsService = inject(RecordsService);
  private readonly utilsService = inject(UtilsService);
  private readonly dataTemplatesService = inject(DataTemplatesService);
  private readonly messageService = inject(MessageService);
  private readonly blockchainService = inject(BlockchainService);

  // function references
  isInputTextFieldByProcessedField = isInputTextFieldByProcessedField;
  isInputSelectFieldByProcessedField = isInputSelectFieldByProcessedField;

  // selectors
  basicDetails = this.store.selectSignal(NewDataTemplateState.getBasicDetails);
  dataTemplateName = this.store.selectSignal(
    NewDataTemplateState.getDataTemplateName
  );
  plotName = this.store.selectSignal(NewDataTemplateState.getPlotName);
  workflowName = this.store.selectSignal(NewDataTemplateState.getWorkflowName);
  availableStagesToSelect = this.store.selectSignal(
    NewDataTemplateState.getAvailableStagesToSelect
  );
  profile = this.store.selectSignal(AuthState.getProfile)

  destroy$ = new Subject();

  // form
  formGroup = signal<FormGroup>(
    this.formBuilder.group({
      stage: [null, Validators.required],
    })
  );
  constructingForm = signal(false);
  dynamicFormFields = signal<ProcessedInputField[]>([]);
  selectedStage = signal<StageWithInputFields | null>(null);
  savingTemplate = signal(false);


  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      this.pageHeight.set(`calc(100vh - ${100 + statusBarHeight}px)`);
    });
  }

  constructor() {
    effect(() => {
      if (!this.basicDetails())
        this.router.navigate(['/data-templates/create/basic-details']);
    });
  }

  onSelectStage({ value }: DropdownChangeEvent) {
    if (typeof value === 'string') {
      this.constructingForm.set(true);
      this.stagesService
        .getStageByName(value)
        .pipe(first())
        .subscribe(async (stage) => {
          this.selectedStage.set(stage.Response);
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

      this.formGroup.set(formGroup);
    }
  }

  async onSubmit() {
    this.savingTemplate.set(true);
    const { coords } = await Geolocation.getCurrentPosition();

    const formValue = {
      ...this.formGroup().value,
      stage: {
        _id: this.selectedStage()?._id,
        stagename: this.selectedStage()?.stagename,
        description: this.selectedStage()?.description,
      },
      templatename: this.basicDetails()?.name,
      plot: this.basicDetails()?.plot,
      workflow: this.basicDetails()?.workflow,
      timestamp: Date.now(),
      geocoordinates: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      prevHash: null, //TODO: Change later
      // currentHash: null, // TODO: Change later
      userid: this.profile()?.userid,
    };

    const formValueHash = await this.utilsService.getObjectHash(formValue);
    try {
      const txnHash = await this.blockchainService.xdrBuildForFormSubmission(
        this.basicDetails()?.name ?? 'No template name defined',
        this.basicDetails()?.workflow.workflowname ?? 'No workflow defined',
        this.selectedStage()?.stagename ?? 'No Stage defined',
        formValueHash,
        '',
        Date.now(),
        coords.latitude + 'and' + coords.longitude,
        config.appId ?? 'No appID defined'
      );

      const finalFormValue = {
        ...formValue,
        templateHash: formValueHash,
        currentHash: txnHash,
      };

      this.dataTemplatesService
        .saveDataTemplate(finalFormValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.savingTemplate.set(false);
            this.formGroup.set(
              this.formBuilder.group({
                stage: [null, Validators.required],
              })
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Data template created successfully',
            });
            this.router.navigate(['/data-templates/view']);
          },
          error: (error) => {
            this.savingTemplate.set(false);
            console.error('Error saving data template:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error saving data template',
            });
          },
        });

      console.log(finalFormValue);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  }
}
