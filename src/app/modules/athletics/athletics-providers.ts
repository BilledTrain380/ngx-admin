import {Gender} from '../participant/participant-models';
import {Competitor, Result, TemporaryResult} from './athletics-models';
import {Group} from '../group/group-models';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {REST_SERVICE, RestService} from '../http/http-service';
import {competitorsJsonSchema, resultsJsonSchema} from './json-schema';

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
     * @param group {Group} The group to filter
     * @param gender {Gender} The gender to filter
     *
     * @return an array of the resulting competitors
     */
    getCompetitors(group?: Group, gender?: Gender): Promise<ReadonlyArray<Competitor>>;

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

    getCompetitors(group?: Group, gender?: Gender): Promise<ReadonlyArray<Competitor>> {

        const groupParam: string = group ? '' : `group=${group.name}`;
        const genderParam: string = gender ? '' : `gender=${gender}`;

        const params: string = [groupParam, genderParam].filter(it => it !== '').join('&');

        const url: string = 'competitors' + (params === '') ? params : '?' + params;
        return this.rest.getRequest(url, competitorsJsonSchema);
    }

    saveResults(competitor: Competitor, results: ReadonlyArray<TemporaryResult>): Promise<ReadonlyArray<Result>> {

        const url: string = `competitor/${competitor.id}`;

        const body: object = {
            results: results,
        };

        return this.rest.patchRequest(url, JSON.stringify(body), resultsJsonSchema);
    }
}
