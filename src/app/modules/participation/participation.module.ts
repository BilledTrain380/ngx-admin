import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpParticipationProvider, PARTICIPATION_PROVIDER} from './participation-providers';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    providers: [
        {
            provide: PARTICIPATION_PROVIDER,
            useClass: HttpParticipationProvider,
        },
    ],
})
export class ParticipationModule {
}
