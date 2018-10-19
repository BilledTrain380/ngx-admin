import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {USER_PROVIDER, UserProvider} from '../../../../modules/user/user-providers';
import {User} from '../../../../modules/user/user-models';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'ngx-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent {

    isPasswordRevealed: boolean = false;

    // Should be set through the modal ref component instance.
    takenUsernames: ReadonlyArray<string> = [];

    usernameIsTaken: boolean = false;

    readonly passwordPolicyRegex: string = environment.passwordPolicy;

    constructor(
        private readonly activeModal: NgbActiveModal,
        @Inject(USER_PROVIDER)
        private readonly userProvider: UserProvider,
    ) {}

    togglePasswordReveal(): void {
        this.isPasswordRevealed = !this.isPasswordRevealed;
    }

    dismissModal(): void {
        this.activeModal.dismiss();
    }

    checkUsername(name: string): void {
        this.usernameIsTaken = !!this.takenUsernames.find(it => it === name);
    }

    async submit(form: NgForm): Promise<void> {

        const user: User = {
            id: 0,
            username: form.value.username,
            enabled: form.value.enabled,
        };

        await this.userProvider.createUser(user, form.value.password);
        this.activeModal.close();
    }
}
