/**
 * Describes settings for the SmartSearch.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 *
 * @property searchProperties - Properties of T, which will be used to match the search term.
 *                              If the property is not a string, the string value of it will be used.
 * @property displayProperties - Properties of T, which will be used to display the search result.
 * @property displaySeparator - The separator which is used to join the displayProperties.
 * @property limit - The search result limit.
 */
export interface SearchSettings<T> {
    readonly searchProperties: ReadonlyArray<keyof T>;
    readonly displayProperties: ReadonlyArray<keyof T>;
    readonly displaySeparator: string;
    readonly limit: number;
}
