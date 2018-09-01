import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Gender, Participant} from '../../../modules/participant/participant-models';
import {LocalDataSource} from 'ng2-smart-table';
import {Sport} from '../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../modules/participant/participant-providers';
import {PARTICIPATION_PROVIDER, ParticipationProvider} from '../../../modules/participation/participation-providers';
import {ParticipationStatus} from '../../../modules/participation/participation-models';
import {Group} from '../../../modules/group/group-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {ResourceNotFoundError} from '../../../modules/http/http-errors';
import {ParticipantDataSource} from './table-data-source';
import {SportViewComponent} from './table-cell-views/sport-view.component';
import {AbsentViewComponent} from './table-cell-views/absent-view.component';
import {SPORT_PROVIDER, SportProvider} from '../../../modules/sport/sport-providers';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationComponent} from '../../../modules/confirmation/confirmation.component';
import {EditComponent} from './edit/edit.component';

const baseTableSettings: object = {
    hideSubHeader: true,
    mode: 'external',
    actions: {
        columnTitle: 'Akitonen',
    },
    edit: {
        editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
    },
};

const baseTableColumns: object = {
    firstName: {
        title: 'Vorname',
        type: 'string',
        editable: false,
    },
    lastName: {
        title: 'Nachname',
        type: 'string',
        editable: false,
    },
    gender: {
        title: 'Geschlecht',
        type: 'string',
        editable: false,
        valuePrepareFunction: (cell, row) => {
            if (cell === Gender.MALE) return 'Männlich';
            if (cell === Gender.FEMALE) return 'Weiblich';
            return cell;
        },
    },
    address: {
        title: 'Adresse',
        type: 'string',
        editable: false,
    },
    absent: {
        title: 'Abwesend',
        type: 'custom',
        editable: false,
        renderComponent: AbsentViewComponent,
    },
};

@Component({
    selector: 'ngx-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {

    loading: boolean = true;
    editSuccess: boolean = false;
    deleteSuccess: boolean = false;

    readonly tableSettings: object;
    readonly mutableTableSettings: object;

    readonly tableSource: LocalDataSource = new LocalDataSource();

    activeGroup: Group = {name: '', coach: '', pendingParticipation: false};
    participationStatus: ParticipationStatus = ParticipationStatus.CLOSE;
    participantList: ReadonlyArray<Participant> = [];
    sports: ReadonlyArray<Sport> = [];

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly modalService: NgbModal,

        @Inject(PARTICIPATION_PROVIDER)
        private readonly participationProvider: ParticipationProvider,

        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,

        @Inject(SPORT_PROVIDER)
        private readonly sportProvider: SportProvider,
    ) {

        const mutableColumns = Object.assign({}, baseTableColumns, {
            sport: {
                title: 'Sportart',
                type: 'custom',
                editable: false,
                renderComponent: SportViewComponent,
                onComponentInitFunction: (component: SportViewComponent) => {
                    component.init(this.sports); // pass in the sports to the cell component
                },
            },
        });

        this.mutableTableSettings = Object.assign({ columns: mutableColumns }, baseTableSettings);

        const columns = Object.assign({}, baseTableColumns, {
            sport: {
                title: 'Sportart',
                type: 'string',
                editable: false,
            },
        });

        this.tableSettings = Object.assign({columns}, baseTableSettings);
    }

    ngOnInit(): void {

        this.route.params
            .pipe(take(1))
            .subscribe(async (params) => {

                try {
                    this.activeGroup = await this.groupProvider.getOne(params['name']);
                    this.sports = await this.sportProvider.getAll();
                    this.participationStatus = await this.participationProvider.getStatus();

                    await this.loadParticipants();
                    this.loading = false;

                } catch (error) {
                    if (error instanceof ResourceNotFoundError) {
                        this.router.navigate(['pages/group/detail']);
                    } else {
                        throw error;
                    }
                }
            });
    }

    participationIsOpen(): boolean {
        return this.participationStatus === ParticipationStatus.OPEN;
    }

    participationIsClosed(): boolean {
        return this.participationStatus === ParticipationStatus.CLOSE;
    }

    async deleteParticipant(participant: Participant): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(ConfirmationComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.message =
            `Möchten Sie den Teilnehmer '${participant.prename} ${participant.surname}' wirlich löschen?`;

        // we catch the modal dismiss, so it won't bubble the error
        modal.result
            .then(async () => {
                await this.participantProvider.delete(participant);
                await this.loadParticipants();

                this.deleteSuccess = true;
                setTimeout(() => {
                    this.deleteSuccess = false;
                }, 5000);
            }).catch(() => {});
    }

    async editParticipant(participant: Participant): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(EditComponent, {size: 'lg', container: 'nb-layout'});
        modal.componentInstance.participant = participant;

        // we catch the modal dismiss, so it won't bubble the error
        modal.result
            .then(async () => {
                await this.loadParticipants();

                this.editSuccess = true;
                setTimeout(() => {
                    this.editSuccess = false;
                }, 5000);
            }).catch(() => {});
    }

    async loadParticipants(): Promise<void> {

        this.participantList = await this.participantProvider.getByGroup(this.activeGroup);

        this.tableSource.load(
            this.participantList.map<ParticipantDataSource>(it => ({
                id: it.id,
                firstName: it.prename,
                lastName: it.surname,
                gender: it.gender,
                address: it.address,
                absent: it.absent,
                sport: (it.sport) ? it.sport.name : null,
                originalValue: it,
            })),
        );
    }
}

