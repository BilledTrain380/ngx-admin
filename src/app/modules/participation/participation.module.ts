import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PARTICIPATION_PROVIDER} from './participation-providers';
import {HttpParticipantProvider} from '../participant/participant-providers';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    providers: [
        {
            provide: PARTICIPATION_PROVIDER,
            useClass: HttpParticipantProvider,
        },
    ],
})
export class ParticipationModule {
}
