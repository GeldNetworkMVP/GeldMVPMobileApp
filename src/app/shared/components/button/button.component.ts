import { RippleModule } from 'primeng/ripple';
import { Component, HostBinding, input, output } from "@angular/core";
import { NgClass } from '@angular/common';
import { RouterLink, UrlTree } from '@angular/router';

@Component({
    selector: "app-button",
    standalone: true,
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    imports: [RippleModule, NgClass, RouterLink]
})
export class ButtonComponent {
    // props
    color = input.required<"black" | "yellow">();
    size = input<"sm" | "md" | "lg">("md");
    block = input<boolean>(false);
    routerLink = input< string | any[] | UrlTree | null | undefined>(undefined)

    // directly change the style of the host element
    @HostBinding('style.width') get width() { return this.block() ? "100%" : ""; }

    click = output<MouseEvent>()

    onClick(event: MouseEvent) {
        this.click.emit(event);
    }
}