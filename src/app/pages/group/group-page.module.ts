import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImportComponent} from './overview/import/import.component';
import {GroupOverviewComponent} from './overview/group-overview.component';
import {DropzoneModule} from '../../modules/dropzone/dropzone.module';
import {GroupModule} from '../../modules/group/group.module';
import {GroupDetailComponent} from './detail/group-detail.component';
import {ParticipantModule} from '../../modules/participant/participant.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SportModule} from '../../modules/sport/sport.module';
import {ParticipationModule} from '../../modules/participation/participation.module';
import {SmartSearchModule} from '../../modules/smart-search/smart-search.module';
import {SportViewComponent} from './detail/table-cell-views/sport-view.component';
import {AbsentViewComponent} from './detail/table-cell-views/absent-view.component';
import {NbCalendarModule, NbSpinnerModule} from '@nebular/theme';
import {ConfirmationModule} from '../../modules/confirmation/confirmation.module';
import { EditComponent } from './detail/edit/edit.component';
import { ParticipationComponent } from './detail/participation/participation.component';
import { ReParticipationComponent } from './detail/re-participation/re-participation.component';

@NgModule({
    imports: [
        ThemeModule,
        RouterModule,
        NgbModalModule,
        NgbModule,
        DropzoneModule,
        GroupModule,
        ParticipantModule,
        ParticipationModule,
        SportModule,
        SmartSearchModule,
        Ng2SmartTableModule,
        NbSpinnerModule,
        ConfirmationModule,
        NbCalendarModule,
    ],
    entryComponents: [
        ImportComponent,
        GroupOverviewComponent,
        GroupDetailComponent,
        SportViewComponent,
        AbsentViewComponent,
        EditComponent,
    ],
    declarations: [
        ImportComponent,
        GroupOverviewComponent,
        GroupDetailComponent,
        SportViewComponent,
        AbsentViewComponent,
        EditComponent,
        ParticipationComponent,
        ReParticipationComponent,
    ],
})
export class GroupPageModule { }
