import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationComponent} from './confirmation.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        ConfirmationComponent,
    ],
    declarations: [ConfirmationComponent],
    entryComponents: [ConfirmationComponent],
})
export class ConfirmationModule {
}
