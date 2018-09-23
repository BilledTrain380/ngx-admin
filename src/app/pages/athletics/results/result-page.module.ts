import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbCheckboxModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SmartSelectModule} from '../../../modules/smart-select/smart-select.module';
import {AthleticsModule} from '../../../modules/athletics/athletics.module';
import {GroupModule} from '../../../modules/group/group.module';
import {AthleticsRoutingModule} from '../athletics-routing.module';
import {ResultViewComponent} from './table-cell-views/result-view/result-view.component';
import {ResultPageState} from './result-page.state';
import {ResultsComponent} from './results.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbCheckboxModule,
        FormsModule,
        SmartSelectModule,
        AthleticsModule,
        GroupModule,
        AthleticsRoutingModule,
    ],
    entryComponents: [
        ResultViewComponent,
        ResultsComponent,
    ],
    declarations: [
        ResultViewComponent,
        ResultsComponent,
    ],
    providers: [
        ResultPageState,
    ],
})
export class ResultPageModule {
}
