import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
} from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonContent,
  NavController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-with-back-button',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent],
  templateUrl: './with-back-button.layout.html',
  styleUrls: ['./with-back-button.layout.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WithBackButtonLayoutComponent {
  // Props
  urlToGoBack = input.required<string>();
  actionToPerformOnBack = input<() => void>();
  pageTitle = input<string>();

  // Dependencies
  navCtrl = inject(NavController);

  goBack() {
    this.navCtrl.navigateBack(this.urlToGoBack());
    const action = this.actionToPerformOnBack();
    if (action) {
      action();
    }
  }
}
