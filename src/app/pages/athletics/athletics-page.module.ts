import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultPageModule} from './results/result-page.module';
import {AthleticsRoutingModule} from './athletics-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ResultPageModule,
        AthleticsRoutingModule,
    ],
})
export class AthleticsPageModule {
}
