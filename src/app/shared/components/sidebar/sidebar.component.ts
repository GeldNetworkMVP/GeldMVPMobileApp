import { Component } from "@angular/core";
import { IonContent, IonMenuToggle, IonButton, IonMenu } from "@ionic/angular/standalone";

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [IonContent, IonMenuToggle, IonButton, IonMenu]
})
export class SidebarComponent { }