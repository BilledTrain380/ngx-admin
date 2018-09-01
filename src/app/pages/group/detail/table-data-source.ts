import {Participant} from '../../../modules/participant/participant-models';

/**
 * Describes a data source for smart tables.
 *
 * @author nmaerchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface ParticipantDataSource {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly address: string;
    readonly absent: boolean;
    readonly sport: string;
    readonly originalValue: Participant;
}
