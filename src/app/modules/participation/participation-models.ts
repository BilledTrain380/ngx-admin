/**
 * Describes a participation.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface Participation {
    readonly status: ParticipationStatus;
}

export enum ParticipationStatus {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    RESET = 'RESET',
}
