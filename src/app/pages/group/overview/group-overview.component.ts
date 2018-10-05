import {Component, Inject, OnInit} from '@angular/core';
import {Group} from '../../../modules/group/group-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ImportComponent} from './import/import.component';
import {NbAccessChecker} from '@nebular/security';

class GroupModel {

    readonly name: string;
    readonly coach: string;

    constructor(group: Group, readonly pendingParticipation: boolean) {
        this.name = group.name;
        this.coach = group.coach.name;
    }
}

@Component({
  selector: 'ngx-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss'],
})
export class GroupOverviewComponent implements OnInit {

    importSuccessful: boolean = false;

    groupList: Array<GroupModel> = [];

    constructor(

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,

        private readonly modalService: NgbModal,
        readonly accessChecker: NbAccessChecker,
    ) {}

    ngOnInit(): void {

        this.groupProvider.getGroupList({pendingParticipation: true}).then(groups => {
            this.groupList = this.groupList.concat(...groups.map(it => new GroupModel(it, true)));
            this.groupList.sort((a, b) => a.name.localeCompare(b.name));
        });

        this.groupProvider.getGroupList({pendingParticipation: false}).then(groups => {
            this.groupList = this.groupList.concat(...groups.map(it => new GroupModel(it, false)));
            this.groupList.sort((a, b) => a.name.localeCompare(b.name));
        });
    }

    showImportModal(): void {
        const modal: NgbModalRef = this.modalService.open(ImportComponent, {size: 'lg', container: 'nb-layout'});
        modal.result.then(() => {
            this.ngOnInit();
            this.importSuccessful = true;
            setTimeout(() => {
                this.importSuccessful = false;
            }, 5000);
        }).catch(() => {});
    }
}

