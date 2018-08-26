import {Injectable, InjectionToken} from '@angular/core';
import {Group} from './group-models';
import {environment} from '../../../environments/environment';
import * as AjvImpl from 'ajv';
import {groupJsonSchema, groupsJsonSchema} from './json-schemas';

export const GROUP_PROVIDER: InjectionToken<GroupProvider> = new InjectionToken('Token for a group provider');

/**
 * Describes a provider which access data related to a Group.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface GroupProvider {

    /**
     * @return all available Groups
     * @throws {TypeError} if the response does not match the expected type
     * @throws {Error} if the response is not ok
     */
    getAll(): Promise<Array<Group>>;

    /**
     * Gets the group with the given {@code name}.
     *
     * @param name - The name of the group
     *
     * @return the group matching the given name
     * @throws {ReferenceError} if no group could be found
     * @throws {TypeError} if the response does not match the expected type
     * @throws {Error} if the response is not ok
     */
    getOne(name: string): Promise<Group>;
}

/**
 *
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpGroupProvider implements GroupProvider {

    /**
     * @return all available Groups
     * @throws {TypeError} if the response does not match the expected type
     * @throws {Error} if the response is not ok
     */
    async getAll(): Promise<Array<Group>> {

        const response: Response = await fetch(`${environment.host}/groups`, {
            method: 'GET',
            mode: 'same-origin',
        });

        if (!response.ok) throw new Error(`Response is not ok: statusCode=${response.status}`);

        const responseBody: any = response.json();

        const valid: boolean = await new AjvImpl()
            .validate(groupsJsonSchema, responseBody);

        if (!valid) throw new TypeError('Response does not match JSON schema');

        return responseBody;
    }

    /**
     * Gets the group with the given {@code name}.
     *
     * @param name - The name of the group
     *
     * @return the group matching the given name
     * @throws {ReferenceError} if no group could be found
     * @throws {TypeError} if the response does not match the expected type
     * @throws {Error} if the response is not ok
     */
    async getOne(name: string): Promise<Group> {

        const response: Response = await fetch(`${environment.host}/group/${name}`, {
            method: 'GET',
            mode: 'same-origin',
        });

        if (response.status === 404) throw new ReferenceError(`Group does not exists: name=${name}`);
        if (!response.ok) throw new Error(`Response is not ok: statusCode=${response.status}`);

        const responseBody: any = response.json();

        const valid: boolean = await new AjvImpl()
            .validate(groupJsonSchema, responseBody);

        if (!valid) throw new TypeError('Response does not match JSON schema');

        return responseBody;
    }
}
