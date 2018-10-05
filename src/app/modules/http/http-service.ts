import {Injectable, InjectionToken} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/data-source/data-source';
import {environment} from '../../../environments/environment';
import * as AjvImpl from 'ajv';
import {AuthenticationError, BadRequestError, RequestError, ResourceNotFoundError} from './http-errors';
import {NoConnectionError} from '../../app.errors';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {Router} from '@angular/router';

export type RequestBody = Blob | DataSource | string;

export const REST_SERVICE: InjectionToken<RestService> = new InjectionToken('token for rest service');
export const HTTP_SERVICE: InjectionToken<HttpService> = new InjectionToken('token for http service');

/**
 * Describes a service for REST requests.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface RestService {

    /**
     * Fetches a GET request to the given {@code url}.
     *
     * @type T - The response type.
     * @param url - The url to fetch.
     * @param jsonSchema - The JSON schema to validate the response body.
     *
     * @return the response body as T
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the request is not valid
     * @throws {TypeError} if the response does not match the expected type
     * @throws {RequestError} if the response is not ok
     */
    getRequest<T>(url: string, jsonSchema: object): Promise<T>;

    /**
     * Fetches a POST request to the given {@code url}.
     *
     * If the response body is not needed, the type {@coed T} should be {@code void}.
     * In this case the {@code jsonSchema} can be omitted.
     *
     * @type T - The response type.
     * @param url - The url to fetch.
     * @param body - The request body to send.
     * @param jsonSchema - The JSON schema to validate the response body.
     *
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the request is not valid
     * @throws {TypeError} if the response does not match the expected type
     * @throws {RequestError} if the response is not ok
     */
    postRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T>;

    /**
     * Fetches a PATCH request to the given {@code url}.
     *
     * If the response body is not needed, the type {@coed T} should be {@code void}.
     * In this case the {@code jsonSchema} can be omitted.
     *
     * @type T - The response type.
     * @param url - The url to fetch.
     * @param body - The request body to send.
     * @param jsonSchema - The JSON schema to validate the response body.
     *
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the request is not valid
     * @throws {TypeError} if the response does not match the expected type
     * @throws {RequestError} if the response is not ok
     */
    patchRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T>;

    /**
     * Fetches a PUT request to the given {@code url}.
     *
     * If the response body is not needed, the type {@coed T} should be {@code void}.
     * In this case the {@code jsonSchema} can be omitted.
     *
     * @type T - The response type.
     * @param url - The url to fetch.
     * @param body - The request body to send.
     * @param jsonSchema - The JSON schema to validate the response body.
     *
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the request is not valid
     * @throws {TypeError} if the response does not match the expected type
     * @throws {RequestError} if the response is not ok
     */
    putRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T>;

    /**
     * Fetches a DELETE request to the given {@code url}.
     *
     * If the response body is not needed, the type {@coed T} should be {@code void}.
     * In this case the {@code jsonSchema} can be omitted.
     *
     * @type T - The response type.
     * @param url - The url to fetch.
     * @param body - The request body to send.
     * @param jsonSchema - The JSON schema to validate the response body.
     */
    deleteRequest<T>(url: string, body?: RequestBody, jsonSchema?: object): Promise<T>;
}

/**
 * Describes a http service for basic http requests.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
export interface HttpService {

    /**
     * Posts the given {@code formData} to the given url.
     * The default Content-Type will be application/x-www-form-urlencoded.
     *
     * @param url - The url to post the form.
     * @param formData - The form to post.
     * @param headers - The headers to set.
     *
     * @throws {ResourceNotFoundError} if the given {@code url} does not exist
     * @throws {AuthenticationError} if the response status is 401
     * @throws {BadRequestError} if the request is not valid
     * @throws {RequestError} if the response is not ok
     */
    postForm(url: string, formData: FormData, headers?: Headers): Promise<Response>;
}

/**
 * {@link RestService} implementation which uses {@link NbAuthService} to
 * get a Bearer access token. The token will not be validated by this class.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class AuthRestService implements RestService {

    constructor(
        private readonly authService: NbAuthService,
    ) {}

    async getRequest<T>(url: string, jsonSchema: object): Promise<T> {
        return this.fetchRequest<T>(url, 'GET', undefined, jsonSchema);
    }

    async postRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchRequest<T>(url, 'POST', body, jsonSchema);
    }

    async patchRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchRequest<T>(url, 'PATCH', body, jsonSchema);
    }

    async putRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchRequest<T>(url, 'PUT', body, jsonSchema);
    }

    deleteRequest<T>(url: string, body?: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchRequest<T>(url, 'DELETE', body, jsonSchema);
    }

    private async fetchRequest<T>(url: string, method: string, body?: RequestBody, jsonSchema?: object): Promise<T> {

        const token: NbAuthToken = await this.authService.getToken().toPromise();

        const response: Response = await run(fetch, `${environment.host}/${url}`, {
            method,
            mode: 'cors',
            body: body as any, // because typescript sucks and can not recognize the type
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.getValue()}`,
            },
        });

        await handleResponse(response);

        if (jsonSchema) {
            return validateResponseBody(response, jsonSchema);
        }

        return '' as any; // the json schema was not defined, so we return an empty body
    }
}

/**
 * {@link HttpService} implementation which uses {@link NbAuthService} to
 * get a Bearer access token. The token will not be validated by this class.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class AuthHttpService implements HttpService {

    constructor(
        private readonly authService: NbAuthService,
    ) {}

    async postForm(url: string, formData: FormData, headers: Headers = new Headers()): Promise<Response> {

        const token: NbAuthToken = await this.authService.getToken().toPromise();

        headers.append('Authorization', `Bearer ${token.getValue()}`);

        const response: Response = await run(fetch, `${environment.host}/${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: formData,
        });

        await handleResponse(response);

        return response;
    }
}

/**
 * Wrapper class for {@link AuthRestService} which filters authentication errors.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class PSARestService implements RestService, HttpService {

    constructor(
        private readonly authService: NbAuthService,
        private readonly rest: AuthRestService,
        private readonly http: AuthHttpService,
        private readonly router: Router,
    ) {}

    async deleteRequest<T>(url: string, body?: RequestBody, jsonSchema?: object): Promise<T> {

        try {
            await this.doFilter(url);
            return await this.rest.deleteRequest<T>(url, body, jsonSchema);
        } catch (e) {
            this.handleError(e);
        }
    }

    async getRequest<T>(url: string, jsonSchema: object): Promise<T> {

        try {
            await this.doFilter(url);
            return await this.rest.getRequest<T>(url, jsonSchema);
        } catch (e) {
            this.handleError(e);
        }
    }

    async patchRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {

        try {
            await this.doFilter(url);
            return await this.rest.patchRequest<T>(url, body, jsonSchema);
        } catch (e) {
            this.handleError(e);
        }
    }

    async postRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {

        try {
            await this.doFilter(url);
            return await this.rest.postRequest<T>(url, body, jsonSchema);
        } catch (e) {
            this.handleError(e);
        }
    }

    async putRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {

        try {
            await this.doFilter(url);
            return await this.rest.putRequest<T>(url, body, jsonSchema);
        } catch (e) {
            this.handleError(e);
        }
    }

    async postForm(url: string, formData: FormData, headers: Headers = new Headers()): Promise<Response> {

        try {
            await this.doFilter(url);
            return await this.http.postForm(url, formData, headers);
        } catch (e) {
            this.handleError(e);
        }
    }

    private async doFilter(url: string): Promise<void> {

        const isAuthenticated: boolean = await this.authService.isAuthenticated().toPromise();
        const isTokenValid: boolean = (await this.authService.getToken().toPromise()).isValid();

        if (!(isAuthenticated && isTokenValid)) {
            throw new AuthenticationError(
                'User is not authenticated or has an invalid token',
                timestamp(),
                url);
        }
    }

    private handleError(error: any): void {

        if (error instanceof AuthenticationError) {
            this.router.navigate(['/auth/login']);
        }

        throw error;
    }
}

async function run(func: Function, ...args: Array<any>): Promise<any> {
    try {
        return func.apply(null, args);
    } catch (error) {
        throw new NoConnectionError('Could not connect to server');
    }
}

async function handleResponse(response: Response): Promise<void> {

    if (response.ok) {
        return;
    }

    if (response.status === 400)
        throw new BadRequestError(response.statusText, timestamp(), response.url);

    if (response.status === 401)
        throw new AuthenticationError(response.statusText, timestamp(), response.url);

    if (response.status === 404)
        throw new ResourceNotFoundError(response.statusText, timestamp(), response.url);

    throw new RequestError(
        response.statusText,
        timestamp(),
        response.status,
        'Could not resolve request',
        response.url);
}

async function validateResponseBody(response: Response, schema: object): Promise<any> {

    const body: any = await response.json();

    const valid: boolean = await new AjvImpl()
    .validate(schema, body);

    if (!valid) throw new TypeError(`Response does not match JSON schema: url=${response.url}`);

    return body;
}

function timestamp(): string {
    return Date.now().toString(10);
}
