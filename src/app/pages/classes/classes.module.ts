import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {ClassesComponent} from './classes.component';
import {ClassComponent} from './class/class.component';
import {RouterModule} from '@angular/router';
import {SmartTableService} from '../../@core/data/smart-table.service';
import { ImportComponent } from './import/import.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
    NgbModalModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    ImportComponent,
  ],
  declarations: [
    ClassesComponent,
    ClassComponent,
    ImportComponent,
  ],
  providers: [
    SmartTableService,
  ],
})
export class ClassesModule { }
