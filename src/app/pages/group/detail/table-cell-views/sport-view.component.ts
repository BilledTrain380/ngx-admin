import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {Sport} from '../../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {ParticipantDataSource} from '../table-data-source';

@Component({
    selector: 'ngx-sport-view',
    template: '<select #sportInput class="form-control" [(ngModel)]="rowData.sport" (change)="saveSport()">\n' +
        '         <option *ngFor="let sport of sports">{{ sport.name }}</option>\n' +
        '      </select>',
})
export class SportViewComponent implements ViewCell {

    @Input() readonly rowData: ParticipantDataSource;
    @Input() readonly value: string | number;

    @ViewChild('sportInput')
    readonly sportInput: ElementRef;

    sports: ReadonlyArray<Sport> = [];

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {}

    init(value: ReadonlyArray<Sport>): void {
        this.sports = value;
    }

    async saveSport(): Promise<void> {

        const sport: Sport = this.sports.find(it => it.name === this.rowData.sport);

        await this.participantProvider.setSport(this.rowData.originalValue, sport);
    }
}
