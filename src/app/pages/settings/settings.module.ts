import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from './settings-routing.module';
import {UsersModule} from './users/users.module';

@NgModule({
    imports: [
        CommonModule,
        UsersModule,
        SettingsRoutingModule,
    ],
    declarations: [],
})
export class SettingsModule {
}
