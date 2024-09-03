import { Component, inject, OnInit } from '@angular/core';
import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { NewDataTemplateState } from '../../stores/new-data-template-store/new-data-template.state';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { commonModules } from '@app/shared/common.modules';

@Component({
  selector: 'app-create-data-template-detailed',
  styleUrls: ['./create-data-template-detailed.page.scss'],
  templateUrl: './create-data-template-detailed.page.html',
  standalone: true,
  imports: [IonContent, WithBackButtonLayoutComponent, ...commonModules],
})
export class CreateDataTemplateDetailedPage implements OnInit {
  store = inject(Store);
  router = inject(Router);

  // selectors
  basicDetails$ = this.store.select(NewDataTemplateState.getBasicDetails);
  dataTemplateName$ = this.store.select(
    NewDataTemplateState.getDataTemplateName
  );
  plotName$ = this.store.select(NewDataTemplateState.getPlotName);
  workflowName$ = this.store.select(NewDataTemplateState.getWorkflowName);

  destroy$ = new Subject();

  ngOnInit() {
    this.basicDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((basicDetails) => {
        if (!basicDetails) {
          this.router.navigate(['/data-templates/create/basic-details']);
        }
      });
  }
}
