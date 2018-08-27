import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Gender, Participant, Town} from './participant-models';
import {Sport} from '../sport/sport-models';
import {Group} from '../group/group-models';
import {participantJsonSchema, participantListJsonSchema} from './json-schemas';
import {REST_SERVICE, RestService} from '../http/http-service';
import {AuthenticationError, ResourceNotFoundError} from '../http/http-errors';

export const PARTICIPANT_PROVIDER: InjectionToken<ParticipantProvider> =
    new InjectionToken('token for participant provider');

/**
 * Describes a provider for participant related data.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface ParticipantProvider {

    /**
     * @return all available participants
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    getAll(): Promise<Array<Participant>>;

    /**
     * Gets all participants related to the given {@code group}.
     *
     * @param group - The group where the participant belongs to.
     *
     * @return the resulting participants
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    getByGroup(group: Group): Promise<Array<Participant>>;

    /**
     * Gets a single participant matching the given {@code id}.
     *
     * @param id - The ID of the participant.
     *
     * @return the resulting participant
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    getOne(id: number): Promise<Participant>;

    /**
     * Updates the given {@code participant}.
     * Relations are not considered by this method.
     *
     * @param participant - The participant to update
     *
     * @throws {ReferenceError} If no participant could be found.
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    update(participant: Participant): Promise<void>;

    /**
     * Creates the given {@code participant}.
     * The ID of the paricipant will always be ignored.
     *
     * @param participant - The participant to create
     *
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    create(participant: Participant): Promise<void>;

    /**
     * Sets the given {@code sport} on the given {@code participant}.
     *
     * @param participant - The participant to set the sport on.
     * @param sport - The sport to set.
     *
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    setSport(participant: Participant, sport: Sport): Promise<void>;
}

/**
 * Http implementation of a {@link ParticipantProvider}.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpParticipantProvider implements ParticipantProvider {

    constructor(

        @Inject(REST_SERVICE)
        private readonly rest: RestService,
    ) {}

    async getAll(): Promise<Array<Participant>> {

        try {
            return this.rest.getRequest<Array<Participant>>('participants', participantListJsonSchema);
        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }

    getByGroup(group: Group): Promise<Array<Participant>> {

        try {
            return this.rest.getRequest<Array<Participant>>(
                `participants?group=${group.name}`,
                participantListJsonSchema);

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }

    getOne(id: number): Promise<Participant> {

        try {
            return this.rest.getRequest<Participant>(
                `participant/${id}`,
                participantJsonSchema);

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            if (error instanceof ResourceNotFoundError) throw error;
            throw Error(error.message);
        }
    }

    setSport(participant: Participant, sport: Sport): Promise<void> {

        try {

            const body: ParticipantRelations = {sport};

            return this.rest.putRequest<void>(
                `participant/${participant.id}`,
                JSON.stringify(body));

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }

    update(participant: Participant): Promise<void> {

        try {

            const body: UpdateParticipant = {
                surname: participant.surname,
                prename: participant.prename,
                gender: participant.gender,
                birthday: participant.birthday,
                address: participant.address,
                absent: participant.absent,
            };

            return this.rest.patchRequest<void>(
                `participant/${participant.id}`,
                JSON.stringify(body));

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }

    async create(participant: Participant): Promise<void> {

        try {

            const body: CreateParticipant = {
                surname: participant.surname,
                prename: participant.prename,
                gender: participant.gender,
                birthday: participant.birthday,
                address: participant.address,
                town: participant.town,
                group: participant.group,
                sport: participant.sport,
            };

            await this.rest.postRequest('participants', JSON.stringify(body));

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }
}

interface UpdateParticipant {
    readonly surname?: string;
    readonly prename?: string;
    readonly gender?: Gender;
    readonly birthday?: number;
    readonly address?: string;
    readonly absent?: boolean;
}

interface ParticipantRelations {
    readonly town?: Town;
    readonly group?: Group;
    readonly sport?: Sport;
}

interface CreateParticipant {
    readonly surname: string;
    readonly prename: string;
    readonly gender: Gender;
    readonly birthday: number;
    readonly address: string;
    readonly town: Town;
    readonly group: Group;
    readonly sport: Sport;
}
