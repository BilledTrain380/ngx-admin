import {Component, Inject, OnInit} from '@angular/core';
import {Competitor, Discipline, Result, TemporaryResult} from '../../../modules/athletics/athletics-models';
import {GROUP_PROVIDER, GroupProvider} from '../../../modules/group/group-providers';
import {Group} from '../../../modules/group/group-models';
import {SmartSelectSettings} from '../../../modules/smart-select/smart-select-settings';
import {
    COMPETITOR_PROVIDER,
    CompetitorProvider,
    DISCIPLINE_PROVIDER,
    DisciplineProvider,
} from '../../../modules/athletics/athletics-providers';
import {Gender} from '../../../modules/participant/participant-models';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

class ResultModel {

    readonly id: number;
    readonly distance?: string;
    readonly discipline: Discipline;

    readonly valueProperty: Observable<number>;
    value: string;
    isValueValid: boolean = true;

    points: number;
    readonly unit: string;

    isCalculating: boolean = false;

    private readonly valueEmitter: Subject<number> = new Subject();

    constructor(
        result: Result,
    ) {
        this.id = result.id;
        this.discipline = result.discipline;
        this.distance = result.distance;
        this.value = String(result.value / result.discipline.unit.factor);
        this.points = result.points;
        this.unit = result.discipline.unit.name;
        this.valueProperty = this.valueEmitter.asObservable();
    }

    validate(): void {

        // just replace comma with decimal point, so it does not matter whenever its a comma or decimal point
        this.value = this.value.replace(',', '.');

        if (Number.isNaN(Number(this.value))) {
            this.isValueValid = false;
            return;
        }

        this.isValueValid = true;
    }

    valueChanged(): void {
        this.validate();
        if (this.isValueValid) this.valueEmitter.next(Number(this.value));
    }
}

class CompetitorModel {

    readonly startNumber: number;
    readonly prename: string;
    readonly surname: string;
    readonly gender: Gender;
    readonly result?: ResultModel;

    constructor(
        competitor: Competitor,
        currentDiscipline: Discipline,
    ) {
        this.startNumber = competitor.startNumber;
        this.prename = competitor.prename;
        this.surname = competitor.surname;
        this.gender = competitor.gender;
        this.result = new ResultModel(
            competitor.results.find(it => it.discipline.name === currentDiscipline.name),
        );
    }
}

@Component({
    selector: 'ngx-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {

    readonly groupSelectSettings: SmartSelectSettings<Group> = {
        onDisplay: value => value.name,
    };

    readonly disciplineSelectSettings: SmartSelectSettings<Discipline> = {
        onDisplay: value => value.name,
    };

    // display options control fields
    isMale: boolean = true;
    isFemale: boolean = false;
    selectedGroup?: Group;
    selectedDiscipline?: Discipline;

    isLoading: boolean = false;

    groups: ReadonlyArray<Group> = [];
    disciplines: ReadonlyArray<Discipline> = [];
    competitors: ReadonlyArray<CompetitorModel> = [];
    absentCompetitors: ReadonlyArray<CompetitorModel> = [];

    constructor(
        @Inject(GROUP_PROVIDER)
        private readonly groupProvider: GroupProvider,

        @Inject(COMPETITOR_PROVIDER)
        private readonly competitorProvider: CompetitorProvider,

        @Inject(DISCIPLINE_PROVIDER)
        private readonly disciplineProvider: DisciplineProvider,
    ) {}

    ngOnInit(): void {
        this.groupProvider.getGroupList({competitive: true}).then(it => this.groups = it);
        this.disciplineProvider.getAll().then(it => this.disciplines = it);
    }

    onGroupChange(group: Group): void {
        this.selectedGroup = group;
        this.loadCompetitors();
    }

    onDisciplineChange(discipline: Discipline): void {
        this.selectedDiscipline = discipline;
        this.loadCompetitors();
    }

    maleChanged(): void {

        if (!(this.isMale && this.isFemale)) {
            this.isFemale = true;
        }

        this.loadCompetitors();
    }

    femaleChanged(): void {

        if (!(this.isMale && this.isFemale)) {
            this.isMale = true;
        }

        this.loadCompetitors();
    }

    private async loadCompetitors(): Promise<void> {

        this.isLoading = true;

        if (!(this.selectedGroup && this.selectedDiscipline)) return;

        let gender: Gender|undefined;

        if (this.isMale && !this.isFemale) { gender = Gender.MALE; }
        if (!this.isMale && this.isFemale) { gender = Gender.FEMALE; }

        this.competitors = (await this.competitorProvider.getCompetitorList({
            group: this.selectedGroup,
            gender,
            absent: false,
        })).map(it => {
                const model: CompetitorModel = new CompetitorModel(it, this.selectedDiscipline);

            // save result when its value get changed
            model.result.valueProperty
                .pipe(debounceTime(200))
                .pipe(distinctUntilChanged())
                .subscribe(resultValue => {

                    const result: TemporaryResult = {
                        id: model.result.id,
                        value: Math.floor(resultValue * model.result.discipline.unit.factor),
                        distance: model.result.distance,
                        discipline: model.result.discipline,
                    };

                    model.result.isCalculating = true;

                    this.competitorProvider.saveResults(it, [result]).then(results => {
                        // we only send 1 result, therefore the response only has one result
                        model.result.points = results[0].points;
                        model.result.isCalculating = false;
                    });
                });

            return model;
        }).sort((a, b) => a.surname.localeCompare(b.surname));

        this.absentCompetitors = (await this.competitorProvider.getCompetitorList({
            group: this.selectedGroup,
            gender,
            absent: true,
        }))
            .map(it => new CompetitorModel(it, this.selectedDiscipline))
            .sort((a, b) => a.surname.localeCompare(b.surname));

        this.isLoading = false;
    }
}


