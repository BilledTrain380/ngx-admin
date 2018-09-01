import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Participant} from '../../../../modules/participant/participant-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../../modules/participant/participant-providers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'ngx-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent {

    readonly editForm: FormGroup;

    datePickerValue: Date = new Date();

    private _participant: Participant;

    set participant(participant: Participant) {
        this._participant = participant;
        this.editForm.setValue({
            firstName: this._participant.prename,
            lastName: this._participant.surname,
            gender: this._participant.gender,
            address: this._participant.address,
        });
        this.datePickerValue = new Date(this._participant.birthday);
    }

    constructor(
        private readonly activeModal: NgbActiveModal,
        private readonly formBuilder: FormBuilder,

        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {
        this.editForm = formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            gender: ['MALE', [Validators.required]],
            address: ['', [Validators.required]],
        });
    }

    dismissModal(): void {
        this.activeModal.dismiss();
    }

    submit(): void {

        const updatedParticipant: Participant = {
            id: this._participant.id,
            surname: this.editForm.controls.lastName.value,
            prename: this.editForm.controls.firstName.value,
            gender: this.editForm.controls.gender.value,
            birthday: this.datePickerValue.getTime(),
            address: this.editForm.controls.address.value,
            town: this._participant.town,
            absent: this._participant.absent,
            group: this._participant.group,
            sport: this._participant.sport,
        };

        this.participantProvider.update(updatedParticipant).then(() => {
            this.activeModal.close();
        }).catch(() => {
            this.dismissModal();
        });
    }
}
