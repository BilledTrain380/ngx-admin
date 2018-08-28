import {Component, Inject, OnInit} from '@angular/core';
import {Group} from '../../../modules/group/group-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ImportComponent} from './import/import.component';

@Component({
  selector: 'ngx-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss'],
})
export class GroupOverviewComponent implements OnInit {

    importSuccessful: boolean = false;

    groupList: Array<Group> = [];

    constructor(

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,

        private readonly modalService: NgbModal,
    ) {}

    ngOnInit(): void {

        this.groupProvider.getAll().then(groups => {
            this.groupList = groups;
        });
    }

    showImportModal(): void {
        const model: NgbModalRef = this.modalService.open(ImportComponent, {size: 'lg', container: 'nb-layout'});
        model.result.then(() => {
            this.ngOnInit();
            this.importSuccessful = true;
        });
    }
}
