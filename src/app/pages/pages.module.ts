import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ClassesModule} from './classes/classes.module';
import {GroupPageModule} from './group/group-page.module';

const PAGES_COMPONENTS: Array<any> = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        ClassesModule,
        MiscellaneousModule,
        GroupPageModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}
