import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Sport} from '../../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {Participant} from '../../../../modules/participant/participant-models';
import {Group} from '../../../../modules/group/group-models';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'ngx-participation',
    templateUrl: './participation.component.html',
    styleUrls: ['./participation.component.scss'],
})
export class ParticipationComponent {

    @Input('sports')
    readonly sports: ReadonlyArray<Sport> = [];

    @Input('group')
    private readonly group: Group;

    @Output('onCreate')
    private readonly onCreate: EventEmitter<void> = new EventEmitter();

    datePickerValue: Date = new Date();

    createSuccess: boolean = false;

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {}

    async create(form: NgForm): Promise<void> {

        const newParticipant: Participant = {
            id: 0,
            prename: form.value.firstName,
            surname: form.value.lastName,
            gender: form.value.gender,
            birthday: this.datePickerValue.getTime(),
            absent: false,
            address: form.value.address,
            town: {
                zip: form.value.zipCode,
                name: form.value.town,
            },
            group: this.group,
            sport: form.value.sport,
        };

        await this.participantProvider.create(newParticipant);
        this.onCreate.emit();
        form.resetForm();
        this.datePickerValue = new Date();
        this.createSuccess = true;
        setTimeout(() => {
            this.createSuccess = false;
        }, 5000);
    }
}
