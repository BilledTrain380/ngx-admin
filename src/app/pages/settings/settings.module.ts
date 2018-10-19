import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from './settings-routing.module';
import {UserPageModule} from './users/user-page.module';

@NgModule({
    imports: [
        CommonModule,
        UserPageModule,
        SettingsRoutingModule,
    ],
    declarations: [],
})
export class SettingsModule {
}
