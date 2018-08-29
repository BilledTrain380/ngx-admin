import {Participation, ParticipationStatus} from './participation-models';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {REST_SERVICE, RestService} from '../http/http-service';
import {AuthenticationError} from '../http/http-errors';
import {participationStatusJsonSchema} from './json-schemas';

export const PARTICIPATION_PROVIDER: InjectionToken<ParticipationProvider> =
    new InjectionToken('token for participation');

/**
 * Describes a provider for the participation.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface ParticipationProvider {

    /**
     * @return the participation status
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    getStatus(): Promise<ParticipationStatus>;

    /**
     * Closes the paritcipation.
     *
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    close(): Promise<void>;

    /**
     * Resets the participation which causes all recorded data to be deleted.
     *
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    reset(): Promise<void>;
}

/**
 * Http implementation of {@link ParticipationProvider}.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpParticipationProvider implements ParticipationProvider {

    constructor(
        @Inject(REST_SERVICE)
        private readonly rest: RestService,
    ) {}

    async close(): Promise<void> {
        await this.update(ParticipationStatus.CLOSE);
    }

    async getStatus(): Promise<ParticipationStatus> {

        const participation: Participation = await this.rest.getRequest<Participation>(
            'participation',
            participationStatusJsonSchema,
        );

        return participation.status;
    }

    async reset(): Promise<void> {
        await this.update(ParticipationStatus.RESET);
    }

    private update(status: ParticipationStatus): Promise<void> {

        const body: Participation = {
            status,
        };

        return this.rest.patchRequest('participation', JSON.stringify(body));
    }
}
