import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Participant} from '../../../modules/participant/participant-models';
import {Sport} from '../../../modules/sport/sport-models';
import {PARTICIPANT_PROVIDER, ParticipantProvider} from '../../../modules/participant/participant-providers';
import {PARTICIPATION_PROVIDER, ParticipationProvider} from '../../../modules/participation/participation-providers';
import {ParticipationStatus} from '../../../modules/participation/participation-models';
import {Group} from '../../../modules/group/group-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {ResourceNotFoundError} from '../../../modules/http/http-errors';
import {SPORT_PROVIDER, SportProvider} from '../../../modules/sport/sport-providers';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationComponent} from '../../../modules/confirmation/confirmation.component';
import {EditComponent} from './edit/edit.component';
import {ParticipationComponent} from './participation/participation.component';
import {ParticipantAction, ParticipantModel} from './group-detail.models';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'ngx-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {

    loading: boolean = true;
    createSuccess: boolean = false;
    editSuccess: boolean = false;
    deleteSuccess: boolean = false;

    activeGroup: Group = {name: '', coach: { id: 0, name: ''}};
    participationStatus: ParticipationStatus = ParticipationStatus.CLOSE;
    participantList: ReadonlyArray<ParticipantModel> = [];
    sports: ReadonlyArray<Sport> = [];

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly modalService: NgbModal,
        private readonly translateService: TranslateService,

        @Inject(PARTICIPATION_PROVIDER)
        private readonly participationProvider: ParticipationProvider,

        @Inject(PARTICIPANT_PROVIDER)
        private readonly participantProvider: ParticipantProvider,

        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,

        @Inject(SPORT_PROVIDER)
        private readonly sportProvider: SportProvider,
    ) {}

    ngOnInit(): void {

        this.route.params
            .pipe(take(1))
            .subscribe(async (params) => {

                try {
                    this.activeGroup = await this.groupProvider.getGroup(params['name']);
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

    async loadParticipants(): Promise<void> {

        this.participantList = (await this.participantProvider.getByGroup(this.activeGroup))
            .map(it => {

                const model: ParticipantModel = new ParticipantModel(it);

                model.actionsProperty
                    .subscribe(type => {

                        switch (type) {
                            case ParticipantAction.EDIT:
                                this.editParticipant(it);
                                break;
                            case ParticipantAction.DELETE:
                                this.deleteParticipant(it);
                                break;
                        }
                    });

                model.absentProperty
                    .subscribe(absentValue => {
                        const participant: Participant = Object.assign(it, {absent: absentValue});
                        this.participantProvider.update(participant);
                    });

                model.sportProperty
                    .subscribe(sportName => {
                        const sport: Sport = this.sports.find(sportType => sportType.name === sportName);
                        this.participantProvider.setSport(it, sport);

                        if (model.isReparticipate) {
                            model.isReparticipate = false;
                        }
                    });

                return model;
            }).sort((a, b) => a.surname.localeCompare(b.surname));
    }

    async openParticipateModel(): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(ParticipationComponent, {
            size: 'lg', container: 'nb-layout',
        });

        modal.componentInstance.sports = this.sports;
        modal.componentInstance.group = this.activeGroup;

        // we catch the modal dismiss, so it won't bubble up the error
        modal.result
            .then(async() => {

                await this.loadParticipants();

                this.createSuccess = true;
                setTimeout(() => {
                    this.createSuccess = false;
                }, 5000);
            }).catch(() => {});
    }

    private async deleteParticipant(participant: Participant): Promise<void> {

        const modal: NgbModalRef = this.modalService.open(ConfirmationComponent, {
            size: 'lg', container: 'nb-layout',
        });

        const message: string = await this.translateService.get('participant.alert.confirmDelete', {
            name: `${participant.prename} ${participant.surname}`,
        }).toPromise();

        modal.componentInstance.message = message;

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

    private async editParticipant(participant: Participant): Promise<void> {

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
}

