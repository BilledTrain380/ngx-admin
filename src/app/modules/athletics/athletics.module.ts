import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {COMPETITOR_PROVIDER, HttpCompetitorProvider} from './athletics-providers';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: COMPETITOR_PROVIDER,
            useClass: HttpCompetitorProvider,
        },
    ],
    declarations: [],
})
export class AthleticsModule {
}
