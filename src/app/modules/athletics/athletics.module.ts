import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    COMPETITOR_PROVIDER,
    DISCIPLINE_PROVIDER,
    HttpCompetitorProvider,
    HttpDisciplineProvider
} from './athletics-providers';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: COMPETITOR_PROVIDER,
            useClass: HttpCompetitorProvider,
        },
        {
            provide: DISCIPLINE_PROVIDER,
            useClass: HttpDisciplineProvider,
        },
    ],
    declarations: [],
})
export class AthleticsModule {
}
