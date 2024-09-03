import { RippleModule } from 'primeng/ripple';
import { Component, computed, HostBinding, input, output } from "@angular/core";
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink, UrlTree } from '@angular/router';

@Component({
    selector: "app-button",
    standalone: true,
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    imports: [RippleModule, NgClass, RouterLink, NgTemplateOutlet]
})
export class ButtonComponent {
    // props
    color = input.required<"black" | "yellow">();
    size = input<"sm" | "md" | "lg">("md");
    block = input<boolean>(false);
    routerLink = input< string | any[] | UrlTree | null | undefined>(undefined)
    disabled = input<boolean>(false);

    // computed values
    classes = computed(() => {
        return {
            "app-button--sm": this.size() === "sm",
            "app-button--md": this.size() === "md",
            "app-button--lg": this.size() === "lg",
            "app-button--block": this.block(),
            "app-button--black": this.color() === "black",
            "app-button--yellow": this.color() === "yellow",
            "app-button--disabled": this.disabled(),
        }
    })

    isLink = computed(() => this.routerLink() !== undefined);

    // directly change the style of the host element
    @HostBinding('style.width') get width() { return this.block() ? "100%" : ""; }

    click = output<MouseEvent>()

    onClick(event: MouseEvent) {
        this.click.emit(event);
    }
}