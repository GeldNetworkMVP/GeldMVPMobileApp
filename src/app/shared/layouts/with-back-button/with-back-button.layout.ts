import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  NavController,
} from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';

@Component({
  selector: 'app-with-back-button',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent],
  templateUrl: './with-back-button.layout.html',
  styleUrls: ['./with-back-button.layout.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WithBackButtonLayoutComponent implements OnInit {
  // Props
  urlToGoBack = input.required<string>();
  actionToPerformOnBack = input<() => void>();
  pageTitle = input<string>();

  // Dependencies
  navCtrl = inject(NavController);
  topHeight = signal(0);

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({statusBarHeight}) => {
      this.topHeight.set(statusBarHeight);
    });
  }

  goBack() {
    this.navCtrl.navigateBack(this.urlToGoBack());
    const action = this.actionToPerformOnBack();
    if (action) {
      action();
    }
  }
}
