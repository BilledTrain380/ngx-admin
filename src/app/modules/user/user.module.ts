import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpUserProvider, USER_PROVIDER} from './user-providers';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    providers: [
        {
            provide: USER_PROVIDER,
            useClass: HttpUserProvider,
        },
    ],
})
export class UserModule {
}
