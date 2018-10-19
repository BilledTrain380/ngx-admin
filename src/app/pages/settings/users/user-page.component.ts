import {AfterViewInit, Component, Inject} from '@angular/core';
import {USER_PROVIDER, UserProvider} from '../../../modules/user/user-providers';
import {User} from '../../../modules/user/user-models';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmationComponent} from '../../../modules/confirmation/confirmation.component';
import {CreateComponent} from './create/create.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
    selector: 'ngx-users',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements AfterViewInit {

    userList: ReadonlyArray<User> = [];

    deleteSuccess: boolean = false;

    constructor(
        private readonly modalService: NgbModal,
        private readonly translateService: TranslateService,

        @Inject(USER_PROVIDER)
        private readonly userProvider: UserProvider,
    ) {}

    ngAfterViewInit() {
        this.loadUsers();
    }

    async openCreateUserModal(): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(CreateComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.takenUsernames = this.userList.map(it => it.username).concat('admin');

        modal.result
            .then(() => this.loadUsers())
            .catch(() => {});
    }

    async openChangePasswordModal(user: User): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(ChangePasswordComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.user = user;
    }

    async toggleEnableStatus(user: User): Promise<void> {
        await this.userProvider.updateUser(user);
    }

    async deleteUser(user: User): Promise<void> {

        const message: string = await this.translateService.get(
            'settings.users.alert.confirmDelete',
            { username: user.username })
            .toPromise();

        const modal: NgbModalRef = this.modalService.open(ConfirmationComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.message = message;

        // we catch the modal dismiss, so it won't bubble the error
        modal.result
            .then(async () => {

                await this.userProvider.deleteUser(user);

                this.loadUsers();

                this.deleteSuccess = true;
                setTimeout(() => {
                    this.deleteSuccess = false;
                }, 5000);
            }).catch(() => {});
    }

    private async loadUsers(): Promise<void> {
        this.userList = (await this.userProvider.getUsers())
            .filter(it => it.username !== 'admin');
    }
}
