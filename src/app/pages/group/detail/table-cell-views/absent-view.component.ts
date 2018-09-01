import {Component, Inject, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {Participant} from '../../../../modules/participant/participant-models';
import {ParticipantDataSource} from '../table-data-source';

@Component({
    selector: 'ngx-absent-view',
    template: '<nb-checkbox [value]="rowData.absent" (change)="saveAbsentStatus($event)"></nb-checkbox>',
})
export class AbsentViewComponent implements ViewCell {

    @Input()
    readonly rowData: ParticipantDataSource;

    @Input()
    readonly value: string | number;

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {}

    async saveAbsentStatus(event: Event): Promise<void> {

        const newParticipant: Participant = {
            id: this.rowData.originalValue.id,
            surname: this.rowData.originalValue.surname,
            prename: this.rowData.originalValue.prename,
            absent: event.returnValue,
            gender: this.rowData.originalValue.gender,
            birthday: this.rowData.originalValue.birthday,
            address: this.rowData.originalValue.address,
            group: this.rowData.originalValue.group,
            town: this.rowData.originalValue.town,
            sport: this.rowData.originalValue.sport,
        };

        await this.participantProvider.update(newParticipant);
    }
}
