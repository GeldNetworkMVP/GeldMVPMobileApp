import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { InputTextModule } from 'primeng/inputtext';

import { WithBackButtonLayoutComponent } from '@app/shared/layouts/with-back-button/with-back-button.layout';

import { commonModules } from '@shared/common.modules';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-view-profile',
  styleUrls: ['./view-profile.page.scss'],
  templateUrl: './view-profile.page.html',
  standalone: true,
  imports: [
    ButtonComponent,
    IonContent,
    WithBackButtonLayoutComponent,
    InputTextModule,
    ...commonModules,
  ],
})
export class ViewProfilePage implements OnInit {
  pageHeight = signal('');

  ngOnInit(): void {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      this.pageHeight.set(`calc(100vh - ${100 + statusBarHeight}px)`);
    });
  }

  profileFormGroup = new FormGroup({
    email: new FormControl('nethsara@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    contactNumber: new FormGroup({
      countryCode: new FormControl('+94', [Validators.required]),
      number: new FormControl('703614315', [Validators.required]),
    }),
  });

  onSubmit() {
    console.log(this.profileFormGroup.value);
  }
}
