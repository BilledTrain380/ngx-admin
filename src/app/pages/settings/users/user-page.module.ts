import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPageComponent} from './user-page.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';
import {NbCardModule} from '@nebular/theme';
import {UserModule} from '../../../modules/user/user.module';
import {ConfirmationModule} from '../../../modules/confirmation/confirmation.module';
import {CreateComponent} from './create/create.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

@NgModule({
    imports: [
        CommonModule,
        ThemeModule,
        TranslateModule,
        NbCardModule,
        UserModule,
        ConfirmationModule,
    ],
    exports: [UserPageComponent],
    declarations: [UserPageComponent, CreateComponent, ChangePasswordComponent],
    entryComponents: [UserPageComponent, CreateComponent, ChangePasswordComponent],
})
export class UserPageModule {
}
