import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagementComponent} from './management.component';
import {NbAccordionModule, NbBadgeModule, NbCardModule, NbListModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ConfirmationModule} from '../../modules/confirmation/confirmation.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemeModule} from '../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ThemeModule,
        NbCardModule,
        NbListModule,
        RouterModule,
        NbAccordionModule,
        NbBadgeModule,
        ConfirmationModule,
        NgbModalModule,
        TranslateModule,
    ],
    declarations: [ManagementComponent],
})
export class ManagementModule {
}
