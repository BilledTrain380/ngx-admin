import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpUserProvider, JWTUserSupplier, USER_PROVIDER, USER_SUPPLIER} from './user-providers';
import {TranslateModule} from '@ngx-translate/core';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ],
    declarations: [ChangePasswordComponent],
    entryComponents: [ChangePasswordComponent],
    exports: [ChangePasswordComponent],
    providers: [
        {
            provide: USER_PROVIDER,
            useClass: HttpUserProvider,
        },
        {
            provide: USER_SUPPLIER,
            useClass: JWTUserSupplier,
        },
    ],
})
export class UserModule {
}
