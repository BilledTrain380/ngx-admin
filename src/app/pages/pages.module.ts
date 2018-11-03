import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {GroupPageModule} from './group/group-page.module';
import {ManagementModule} from './management/management.module';
import {TranslateModule} from '@ngx-translate/core';
import {EventPageModule} from './event/event-page.module';

const PAGES_COMPONENTS: Array<any> = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
        GroupPageModule,
        ManagementModule,
        EventPageModule,
        TranslateModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}
