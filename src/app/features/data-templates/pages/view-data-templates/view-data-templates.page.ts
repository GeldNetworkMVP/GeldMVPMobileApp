import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { Subject, takeUntil } from 'rxjs';

import { DataTemplatesService } from '@data-templates/services/data-templates.service';
import { SetDataTemplates } from '@data-templates/stores/data-templates-store/data-templates.actions';
import { DataTemplatesState } from '@data-templates/stores/data-templates-store/data-templates.state';

import { WithBackButtonLayoutComponent } from '@shared/layouts/with-back-button/with-back-button.layout';
@Component({
  selector: 'app-view-data-templates',
  styleUrls: ['./view-data-templates.page.scss'],
  templateUrl: './view-data-templates.page.html',
  standalone: true,
  imports: [
    IonContent,
    WithBackButtonLayoutComponent,
    RouterLink,
    DividerModule,
    SkeletonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDataTemplatesPage implements OnDestroy {
  store = inject(Store);
  dataTemplatesService = inject(DataTemplatesService);

  dataTemplates = this.store.selectSignal(DataTemplatesState.getTemplates);
  dataTemplatesLoading = signal<boolean>(false);

  destroy = new Subject<void>();

  constructor() {
    this.dataTemplatesLoading.set(true);
    this.dataTemplatesService
      .getDataTemplatesOfLoggedInUser()
      .pipe(takeUntil(this.destroy))
      .subscribe((response) => {
        this.store.dispatch(new SetDataTemplates(response.Response));
        this.dataTemplatesLoading.set(false);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
