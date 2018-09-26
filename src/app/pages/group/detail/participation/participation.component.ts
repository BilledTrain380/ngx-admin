import {Component, Inject} from '@angular/core';
import {Sport} from '../../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {Participant} from '../../../../modules/participant/participant-models';
import {Group} from '../../../../modules/group/group-models';
import {NgForm} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-participation',
    templateUrl: './participation.component.html',
    styleUrls: ['./participation.component.scss'],
})
export class ParticipationComponent {

    readonly sports: ReadonlyArray<Sport> = [];
    readonly group: Group;

    datePickerValue: Date = new Date();

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,

        private readonly activeModal: NgbActiveModal,
    ) {}

    dismissModal(): void {
        this.activeModal.dismiss();
    }

    submit(form: NgForm): void {

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

        this.participantProvider.create(newParticipant).then(() => {
            this.activeModal.close();
        }).catch(() => {
            this.dismissModal();
        });
    }
}
