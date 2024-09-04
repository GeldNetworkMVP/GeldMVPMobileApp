import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MetadataService } from './shared/services/metadata.service';
import { setOverlaysWebView } from './shared/utils/set-status-bar-colors.util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent implements OnInit {
  metadataService = inject(MetadataService);

  ngOnInit(): void {
    this.metadataService.setMetadata();
    setOverlaysWebView();
  }
}
