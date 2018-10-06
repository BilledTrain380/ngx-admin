import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationComponent} from './confirmation.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
    ],
    exports: [
        ConfirmationComponent,
    ],
    declarations: [ConfirmationComponent],
    entryComponents: [ConfirmationComponent],
})
export class ConfirmationModule {
}
