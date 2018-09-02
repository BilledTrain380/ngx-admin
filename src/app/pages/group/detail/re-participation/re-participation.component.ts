import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {ParticipationStatus} from '../../../../modules/participation/participation-models';
import {Sport} from '../../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {Participant} from '../../../../modules/participant/participant-models';
import {SearchSettings} from '../../../../modules/smart-search/search-settings';

@Component({
    selector: 'ngx-re-participation',
    templateUrl: './re-participation.component.html',
    styleUrls: ['./re-participation.component.scss'],
})
export class ReParticipationComponent {

    @Input('participationStatus')
    readonly participationStatus: ParticipationStatus = ParticipationStatus.CLOSE;

    @Input('sports')
    readonly sports: ReadonlyArray<Sport> = [];

    @Input('participantList')
    readonly participantList: ReadonlyArray<Participant> = [];

    @Output('onChange')
    private readonly onChange: EventEmitter<void> = new EventEmitter();

    readonly searchSettings: SearchSettings<Participant> = {
        matchFunction: (term, value) => {

            const regex: RegExp = new RegExp(`^.*${term}.*$`, 'i');
            const text: string = `${value.prename} ${value.surname}`;

            const matches: RegExpMatchArray = text.match(regex);

            return matches !== null && matches.length > 0;
        },
        toStringValue: value => `${value.prename} ${value.surname}`,
        limit: 5,
        placeHolder: 'Suche nach Teilnehmer...',
    };

    participant: Participant;
    reParticipattionSuccess: boolean = false;

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {}

    setSearchResult(result: Participant): void {
        this.participant = result;
    }

    async changeSport(): Promise<void> {
        await this.participantProvider.setSport(this.participant, this.participant.sport);
        this.onChange.emit();
        this.participant = undefined;
        this.reParticipattionSuccess = true;
        setTimeout(() => {
            this.reParticipattionSuccess = false;
        }, 5000);
    }
}
