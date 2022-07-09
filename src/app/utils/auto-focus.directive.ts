import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]',
})
export class AutofocusDirective implements AfterViewInit {
    private _host: HTMLElement;
    private _focused: Element | null;
    private _autofocus = true;

    @Input()
    set autofocus(value: boolean | string) {
        this._autofocus = coerceBooleanProperty(value);
    }

    constructor(private readonly element: ElementRef, @Inject(DOCUMENT) document: HTMLDocument) {
        if (typeof this.element.nativeElement.focus !== 'function') {
            throw new Error('Html element must be focusable');
        }
        this._host = element.nativeElement;
        this._focused = document.activeElement;
    }

    public ngAfterViewInit(): void {
        if (this._autofocus && this._host && this._host !== this._focused) {
            setTimeout(() => this.element.nativeElement.focus());
        }
    }
}
