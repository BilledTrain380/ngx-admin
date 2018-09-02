import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagementComponent} from './management.component';
import {NbAccordionModule, NbBadgeModule, NbCardModule, NbListModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ConfirmationModule} from '../../modules/confirmation/confirmation.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        NbListModule,
        RouterModule,
        NbAccordionModule,
        NbBadgeModule,
        ConfirmationModule,
        NgbModalModule,
    ],
    declarations: [ManagementComponent],
})
export class ManagementModule {
}
