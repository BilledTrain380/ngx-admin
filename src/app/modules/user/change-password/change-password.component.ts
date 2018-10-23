import {Component, Inject, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {USER_PROVIDER, UserProvider} from '../user-providers';
import {NgForm} from '@angular/forms';
import {User} from '../user-models';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'ngx-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

    isPasswordRevealed: boolean = false;

    // Should be set through modal ref component instance.
    user: User = {
        id: 0,
        username: '',
        enabled: true,
    };

    readonly passwordPolicyRegex: string = environment.passwordPolicy;

    constructor(
        private readonly activeModal: NgbActiveModal,

        @Inject(USER_PROVIDER)
        private readonly userProvider: UserProvider,
    ) {}

    ngOnInit() {
    }

    togglePasswordReveal(): void {
        this.isPasswordRevealed = !this.isPasswordRevealed;
    }

    dismissModal(): void {
        this.activeModal.dismiss();
    }

    async submit(form: NgForm): Promise<void> {

        await this.userProvider.updateUserPassword(this.user, form.value.password);
        this.activeModal.close();
    }
}
