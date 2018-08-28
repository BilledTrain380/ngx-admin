import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Participant} from '../../../modules/participant/participant-models';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';
import {Sport} from '../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../modules/participant/participant-providers';
import {SPORT_PROVIDER, SportProvider} from '../../../modules/sport/sport-providers';
import {PARTICIPATION_PROVIDER, ParticipationProvider} from '../../../modules/participation/participation-providers';
import {ParticipationStatus} from '../../../modules/participation/participation-models';
import {Group} from '../../../modules/group/group-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {ResourceNotFoundError} from '../../../modules/http/http-errors';

@Component({
    selector: 'ngx-sport-view',
    template: '<select class="form-control" [(ngModel)]="rowData.sport" (change)="saveSport()">\n' +
        '         <option *ngFor="let sport of sports">{{ sport.name }}</option>\n' +
        '      </select>',
})
export class SportViewComponent implements ViewCell, OnInit {

    @Input() readonly rowData: ParticipantDataSource;
    @Input() readonly value: string | number;

    sports: ReadonlyArray<Sport> = [];

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,

        @Inject(SPORT_PROVIDER)
        private readonly sportProvider: SportProvider,
    ) {}

    ngOnInit(): void {
        this.sports = [
            { name: 'Schnelllauf' },
            { name: 'Mehrkampf' },
        ];

        this.sportProvider.getAll().then(sports => {
            this.sports = sports;
        });
    }

    async saveSport(): Promise<void> {

        const participant: Participant = await this.participantProvider.getOne(this.rowData.id);
        const sport: Sport = this.sports.find(it => it.name === this.rowData.sport);

        await this.participantProvider.setSport(participant, sport);
    }
}

@Component({
    selector: 'ngx-absent-view',
    template: '<nb-checkbox [value]="rowData.absent" (change)="saveAbsentStatus($event)"></nb-checkbox>',
})
export class AbsentViewComponent implements ViewCell {

    @Input()
    readonly rowData: ParticipantDataSource;

    @Input()
    readonly value: string | number;

    constructor(
        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,
    ) {}

    async saveAbsentStatus(event: Event): Promise<void> {

        const participant: Participant = await this.participantProvider.getOne(this.rowData.id);

        const newParticipant: Participant = {
            id: participant.id,
            surname: participant.surname,
            prename: participant.prename,
            absent: event.returnValue,
            gender: participant.gender,
            birthday: participant.birthday,
            address: participant.address,
            group: participant.group,
            town: participant.town,
            sport: participant.sport,
        };

        await this.participantProvider.update(newParticipant);
    }
}

@Component({
    selector: 'ngx-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {

    private readonly baseSettings: any = {
        hideSubHeader: true,
        mode: 'external',
        actions: {
            columnTitle: 'Akitonen',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
    };

    private readonly baseColumns: any = {
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

    private participantList: ReadonlyArray<Participant> = [];

    readonly tableSettings: object;
    readonly mutableTableSettings: object;

    source: LocalDataSource = new LocalDataSource();

    activeGroup: Group = {name: '', coach: '', pendingParticipation: false};

    participationStatus: ParticipationStatus = ParticipationStatus.CLOSE;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,

        @Inject(PARTICIPATION_PROVIDER)
        private readonly participationProvider: ParticipationProvider,

        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,
    ) {

        const mutableColumns = Object.assign({}, this.baseColumns, {
            sport: {
                title: 'Sportart',
                type: 'custom',
                editable: false,
                renderComponent: SportViewComponent,
            },
        });

        this.mutableTableSettings = Object.assign({ columns: mutableColumns }, this.baseSettings);

        const columns = Object.assign({}, this.baseColumns, {
            sport: {
                title: 'Sportart',
                type: 'string',
                editable: false,
            },
        });

        this.tableSettings = Object.assign({columns}, this.baseSettings);
    }

    ngOnInit(): void {
        this.route.params
            .pipe(take(1))
            .subscribe(params => {

                this.groupProvider.getOne(params['name'])
                    .then(group => {
                        this.activeGroup = group;
                        return this.loadParticipants();
                    }).catch(error => {
                        if (error instanceof ResourceNotFoundError) this.router.navigate(['pages/group/detail']);
                    });
            });

        this.participationProvider.getStatus().then(status => {
            this.participationStatus = status;
        });
    }

    private async loadParticipants(): Promise<void> {

        this.participantList = await this.participantProvider.getByGroup(this.activeGroup);

        this.source.load(
            this.participantList.map<ParticipantDataSource>(it => ({
                id: it.id,
                firstName: it.prename,
                lastName: it.surname,
                gender: it.gender,
                address: it.address,
                absent: it.absent,
                sport: it.sport.name,
            })),
        );
    }

}

interface ParticipantDataSource {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly address: string;
    readonly absent: boolean;
    readonly sport: string;
}
