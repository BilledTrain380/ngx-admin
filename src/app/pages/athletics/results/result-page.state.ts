import {Gender} from '../../../modules/participant/participant-models';
import {Group} from '../../../modules/group/group-models';
import {Competitor, Discipline} from '../../../modules/athletics/athletics-models';
import {Observable, Subject} from 'rxjs';
import {share} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ResultPageState {

    readonly selectedGender: Observable<Gender>;
    readonly selectedGroup: Observable<Group>;
    readonly selectedDiscipline: Observable<Discipline>;
    readonly disciplines: Observable<ReadonlyArray<Discipline>>;
    readonly groups: Observable<ReadonlyArray<Group>>;
    readonly competitors: Observable<ReadonlyArray<Competitor>>;

    private readonly genderEmitter: Subject<Gender> = new Subject();
    private readonly groupEmitter: Subject<Group> = new Subject();
    private readonly disciplineEmitter: Subject<Discipline> = new Subject();
    private readonly disciplinesEmitter: Subject<ReadonlyArray<Discipline>> = new Subject();
    private readonly groupsEmitter: Subject<ReadonlyArray<Group>> = new Subject();
    private readonly competitorsEmitter: Subject<ReadonlyArray<Competitor>> = new Subject();

    constructor() {
        this.selectedGender = this.genderEmitter.asObservable().pipe(share());
        this.selectedGroup = this.groupEmitter.asObservable().pipe(share());
        this.selectedDiscipline = this.disciplineEmitter.asObservable().pipe(share());
        this.disciplines = this.disciplinesEmitter.asObservable().pipe(share());
        this.groups = this.groupsEmitter.asObservable().pipe(share());
        this.competitors = this.competitorsEmitter.asObservable().pipe(share());
    }

    selectGender(gender: Gender): void {
        this.genderEmitter.next(gender);
    }

    selectGroup(group: Group): void {
        this.groupEmitter.next(group);
    }

    selectDiscipline(discipline: Discipline): void {
        this.disciplineEmitter.next(discipline);
    }

    setDisciplines(disciplines: ReadonlyArray<Discipline>): void {
        this.disciplinesEmitter.next(disciplines);
    }

    setGroups(groups: ReadonlyArray<Group>): void {
        this.groupsEmitter.next(groups);
    }

    setCompetitors(competitors: ReadonlyArray<Competitor>): void {
        this.competitorsEmitter.next(competitors);
    }
}
