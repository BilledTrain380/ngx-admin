import {AfterContentInit, AfterViewInit, Component, EventEmitter, Inject, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {CompetitorDataSource} from '../../table-data-source';
import {Discipline, Result, TemporaryResult} from '../../../../../modules/athletics/athletics-models';
import {COMPETITOR_PROVIDER, CompetitorProvider} from '../../../../../modules/athletics/athletics-providers';
import {ResultPageState} from '../../result-page.state';
import {last, takeLast} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'ngx-result-view',
    templateUrl: './result-view.component.html',
    styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent implements ViewCell, AfterContentInit {

    @Input() readonly rowData: CompetitorDataSource;
    @Input() readonly value: string | number;

    result: ResultModel;

    readonly onChange: Observable<[CompetitorDataSource, TemporaryResult]>;

    private emitter: EventEmitter<[CompetitorDataSource, TemporaryResult]> = new EventEmitter();

    constructor(
        @Inject(COMPETITOR_PROVIDER)
        private readonly competitorProvider: CompetitorProvider,
    ) {
        this.onChange = this.emitter.asObservable();
    }

    ngAfterContentInit(): void {
        this.result = {
            distance: this.rowData.result.distance,
            value: this.rowData.result.value / this.rowData.result.discipline.unit.factor,
            unit: this.rowData.result.discipline.unit.name,
            points: this.rowData.result.points,
        };
    }

    emitResult(value: number): void {

        const result: TemporaryResult = {
            id: this.rowData.result.id,
            discipline: this.rowData.result.discipline,
            value: value,
            distance: this.rowData.result.distance,
        };

        this.emitter.emit([this.rowData, result]);
    }
}

interface ResultModel {
    readonly distance?: string;
    readonly value: number;
    readonly unit: string;
    readonly points: number;
}
