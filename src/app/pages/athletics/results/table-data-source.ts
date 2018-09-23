import {Competitor, Result} from '../../../modules/athletics/athletics-models';

/**
 *
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface CompetitorDataSource {
    readonly startNumber: number;
    readonly prename: string;
    readonly surname: string;
    readonly result: Result;
    readonly originalValue: Competitor;
}
