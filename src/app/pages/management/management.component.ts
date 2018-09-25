import {Component, Inject, OnInit} from '@angular/core';
import {PARTICIPATION_PROVIDER, ParticipationProvider} from '../../modules/participation/participation-providers';
import {GROUP_PROVIDER, GroupProvider} from '../../modules/group/group-providers';
import {Group} from '../../modules/group/group-models';
import {ParticipationStatus} from '../../modules/participation/participation-models';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationComponent} from '../../modules/confirmation/confirmation.component';

@Component({
    selector: 'ngx-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {

    resetSuccess: boolean = false;

    participationStatus: ParticipationStatus = ParticipationStatus.CLOSE;
    groupList: ReadonlyArray<Group> = [];

    constructor(
        private readonly modalService: NgbModal,

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,
        @Inject(PARTICIPATION_PROVIDER)
        private readonly participationProvider: ParticipationProvider,
    ) {
    }

    ngOnInit() {

        this.groupProvider.getGroupList({pendingParticipation: true}).then(groups => {
            this.groupList = this.groupList.concat(...groups);
        });

        this.participationProvider.getStatus().then(status => {
            this.participationStatus = status;
        });
    }

    closeParticipation(): void {
        this.participationProvider.close();
        this.participationStatus = ParticipationStatus.CLOSE;
    }

    resetParticipation(): void {

        const modal: NgbModalRef = this.modalService.open(ConfirmationComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.message = 'Möchten Sie die Teilnahme wirklich zurücksetzen?';

        // we catch the modal dismiss, so it won't bubble the error
        modal.result
            .then(async () => {

                await this.participationProvider.reset();

                this.ngOnInit();

                this.resetSuccess = true;
                setTimeout(() => {
                    this.resetSuccess = false;
                }, 5000);
            }).catch(() => {});
    }
}
