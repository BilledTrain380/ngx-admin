import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImportComponent} from './overview/import/import.component';
import {GroupOverviewComponent} from './overview/group-overview.component';
import {DropzoneModule} from '../../modules/dropzone/dropzone.module';
import {GroupModule} from '../../modules/group/group.module';
import {AbsentViewComponent, GroupDetailComponent, SportViewComponent} from './detail/group-detail.component';
import {ParticipantModule} from '../../modules/participant/participant.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SportModule} from '../../modules/sport/sport.module';
import {ParticipationModule} from '../../modules/participation/participation.module';

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
        Ng2SmartTableModule,
    ],
    entryComponents: [
        ImportComponent,
        GroupOverviewComponent,
        GroupDetailComponent,
        SportViewComponent,
        AbsentViewComponent,
    ],
    declarations: [
        ImportComponent,
        GroupOverviewComponent,
        GroupDetailComponent,
        SportViewComponent,
        AbsentViewComponent,
    ],
})
export class GroupPageModule { }
