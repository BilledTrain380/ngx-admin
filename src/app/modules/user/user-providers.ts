import {Inject, Injectable, InjectionToken} from '@angular/core';
import {User} from './user-models';
import {REST_SERVICE, RestService} from '../http/http-service';
import {userJsonSchema, userListJsonSchema} from './json-schema';

export const USER_PROVIDER: InjectionToken<UserProvider> = new InjectionToken('Token for user provider');

/**
 * Provides user operations.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface UserProvider {

    createUser(user: User, password: string): Promise<void>;

    getUsers(): Promise<ReadonlyArray<User>>;

    getUser(id: number): Promise<User>;

    updateUser(user: User): Promise<void>;

    updateUserPassword(user: User, password: string): Promise<void>;

    deleteUser(user: User): Promise<void>;
}

/**
 * User provider implementation over http connection.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class HttpUserProvider implements UserProvider {

    constructor(
        @Inject(REST_SERVICE)
        private readonly rest: RestService,
    ) {}

    async createUser(user: User, password: string): Promise<void> {

        const body: object = {
            username: user.username,
            enabled: user.enabled,
            password,
        };

        await this.rest.postRequest('api/users', JSON.stringify(body));
    }

    async deleteUser(user: User): Promise<void> {
        await this.rest.deleteRequest(`api/user/${user.id}`);
    }

    async getUser(id: number): Promise<User> {
        return await this.rest.getRequest<User>(`api/user/${id}`, userJsonSchema);
    }

    async getUsers(): Promise<ReadonlyArray<User>> {
        return await this.rest.getRequest<ReadonlyArray<User>>('api/users', userListJsonSchema);
    }

    async updateUser(user: User): Promise<void> {

        const body: object = {
            username: user.username,
            enabled: user.enabled,
        };

        await this.rest.patchRequest(`api/user/${user.id}`, JSON.stringify(body));
    }

    async updateUserPassword(user: User, password: string): Promise<void> {

        const body: object = {
            password,
        };

        await this.rest.putRequest(`api/user/${user.id}`, JSON.stringify(body));
    }
}
