import {Gender} from '../participant/participant-models';
import {Competitor, Discipline, Result, TemporaryResult} from './athletics-models';
import {Group} from '../group/group-models';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {REST_SERVICE, RestService} from '../http/http-service';
import {competitorsJsonSchema, disciplineListJsonSchema, resultsJsonSchema} from './json-schema';

export const COMPETITOR_PROVIDER: InjectionToken<CompetitorProvider> =
    new InjectionToken('token for competitor provider');

/**
 * Provider for the competitor domain.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface CompetitorProvider {

    /**
     * Get all competitors filtered by the given parameters.
     * If a parameter is left out, it will not be considered in the filtering.
     *
     * @param filter - filter options to filter the returned list
     *
     * @return an array of the resulting competitors
     */
    getCompetitorList(filter?: {group?: Group, gender?: Gender, absent?: boolean}): Promise<ReadonlyArray<Competitor>>;

    /**
     * Saves the given {@code results} to the given {@code competitor}.
     *
     * @param competitor {Competitor} The competitor where the results are being saved.
     * @param results {ReadonlyArray<TemporaryResult>} The result to save.
     *
     * @return The saved results
     */
    saveResults(competitor: Competitor, results: ReadonlyArray<TemporaryResult>): Promise<ReadonlyArray<Result>>;
}

/**
 * Http {@link CompetitorProvider} implementation.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpCompetitorProvider implements CompetitorProvider {

    constructor(
        @Inject(REST_SERVICE)
        private readonly rest: RestService,
    ) {}

    getCompetitorList(filter?: {group?: Group, gender?: Gender, absent?: boolean}): Promise<ReadonlyArray<Competitor>> {

        const params: string = (filter.group !== undefined ? `group=${filter.group.name}` : '') +
            (filter.gender !== undefined ? `&gender=${filter.gender}` : '') +
            (filter.absent !== undefined ? `&absent=${filter.absent}` : '');

        const url: string = 'api/rest/competitors' + ((params === '') ? '' : `?${params}`);
        return this.rest.getRequest(url, competitorsJsonSchema);
    }

    saveResults(competitor: Competitor, results: ReadonlyArray<TemporaryResult>): Promise<ReadonlyArray<Result>> {

        const url: string = `api/rest/competitor/${competitor.id}`;

        const body: object = {
            results: results,
        };

        return this.rest.putRequest(url, JSON.stringify(body), resultsJsonSchema);
    }
}

export const DISCIPLINE_PROVIDER: InjectionToken<DisciplineProvider> =
    new InjectionToken('token for discipline provider');

/**
 * Provider for the discipline domain.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface DisciplineProvider {

    /**
     * @return all available disciplines
     */
    getAll(): Promise<ReadonlyArray<Discipline>>;
}

/**
 * Http {@link DisciplineProvider} implementation.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpDisciplineProvider implements DisciplineProvider {

    constructor(
        @Inject(REST_SERVICE)
        private readonly rest: RestService,
    ) {}

    getAll(): Promise<ReadonlyArray<Discipline>> {
        return this.rest.getRequest('api/rest/disciplines', disciplineListJsonSchema);
    }
}
