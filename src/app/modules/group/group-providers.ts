import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Group} from './group-models';
import {groupJsonSchema, groupsJsonSchema} from './json-schemas';
import {AuthenticationError, BadRequestError, ResourceNotFoundError} from '../http/http-errors';
import {HTTP_SERVICE, HttpService, REST_SERVICE, RestService} from '../http/http-service';

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
     * @throws {AuthenticationError} if the response status is 401
     * @throws {Error} If the response is not ok.
     */
    getAll(): Promise<Array<Group>>;

    /**
     * Gets the group with the given {@code name}.
     *
     * @param name - The name of the group
     *
     * @return the group matching the given name
     * @throws {AuthenticationError} if the response status is 401
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {Error} If the response is not ok.
     */
    getOne(name: string): Promise<Group>;

    /**
     * Imports the the given file.
     *
     * @param file - The file to import
     *
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the file is not valid
     * @throws {Error} If the response is not ok.
     */
    import(file: File): Promise<void>;
}

/**
 * Http implementation of a {@link GroupProvider}.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpGroupProvider implements GroupProvider {

    constructor(
        @Inject(REST_SERVICE)
        private readonly rest: RestService,

        @Inject(HTTP_SERVICE)
        private readonly http: HttpService,
    ) {}

    async getAll(): Promise<Array<Group>> {

        try {
            return this.rest.getRequest<Array<Group>>('groups', groupsJsonSchema);
        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            throw Error(error.message);
        }
    }

    async getOne(name: string): Promise<Group> {

        try {
            return this.rest.getRequest<Group>(`group/${name}`, groupJsonSchema);
        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            if (error instanceof ResourceNotFoundError) throw error;
            throw Error(error.message);
        }
    }

    async import(file: File): Promise<void> {

        try {

            const headers: Headers = new Headers();
            headers.set('Content-Type', 'multipart/form-data');

            const formData: FormData = new FormData();
            formData.set('group-input', file);

            await this.http.postForm('group-import', formData, headers);

        } catch (error) {
            if (error instanceof AuthenticationError) throw error;
            if (error instanceof BadRequestError) throw error;
            throw Error(error.message);
        }
    }
}
