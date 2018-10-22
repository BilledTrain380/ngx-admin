import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {

    message: string = '';
    severity: string = 'danger';

    constructor(
        private readonly activeModal: NgbActiveModal,
    ) {
    }

    dismissModal(): void {
        this.activeModal.dismiss();
    }

    confirm(): void {
        this.activeModal.close();
    }
}
