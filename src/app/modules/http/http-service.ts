import {Injectable, InjectionToken} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/data-source/data-source';
import {environment} from '../../../environments/environment';
import * as AjvImpl from 'ajv';
import {AuthenticationError, BadRequestError, RequestError, ResourceNotFoundError} from './http-errors';
import {responseErrorSchema} from './json-schema';

export type RequestBody = Blob | DataSource | string;

export const REST_SERVICE: InjectionToken<RestService> = new InjectionToken('token for rest service');

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
}

/**
 * {@link RestService} implementation for the same origin.
 *
 * This service manages any kind of authentication.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class OriginRestService implements RestService {

    async getRequest<T>(url: string, jsonSchema: object): Promise<T> {

        const response: Response = await fetch(`${environment.host}/${url}`, {
            method: 'GET',
            mode: 'same-origin',
        });

        await handleResponse(response);
        await validateResponseBody(response, jsonSchema);

        return response.json();
    }

    async postRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchWithBody<T>(url, 'POST', body, jsonSchema);
    }

    async patchRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchWithBody<T>(url, 'PATCH', body, jsonSchema);
    }

    async putRequest<T>(url: string, body: RequestBody, jsonSchema?: object): Promise<T> {
        return this.fetchWithBody<T>(url, 'PUT', body, jsonSchema);
    }

    private async fetchWithBody<T>(url: string, method: string, body: RequestBody, jsonSchema?: object): Promise<T> {

        const response: Response = await fetch(`${environment.host}/${url}`, {
            method,
            mode: 'same-origin',
            body: body as any, // because typescript sucks and can not recognize the type
        });

        await handleResponse(response);

        if (jsonSchema) {
            await validateResponseBody(response, jsonSchema);
            return response.json();
        }

        return '' as any; // the json schema was not defined, so we return an empty body
    }
}

export const HTTP_SERVICE: InjectionToken<HttpService> = new InjectionToken('token for http service');

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

const defaultFormHeaders: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

/**
 * {@link HttpService} implementation for the same origin.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class OriginHttpService implements HttpService {

    async postForm(url: string, formData: FormData, headers: Headers = defaultFormHeaders): Promise<Response> {

        const response: Response = await fetch(`${environment.host}/import-group`, {
            method: 'POST',
            mode: 'same-origin',
            headers: headers,
            body: formData,
        });

        await handleResponse(response);

        return response;
    }
}

async function handleResponse(response: Response): Promise<void> {

    if (response.ok) {
        return;
    }

    await validateResponseBody(response, responseErrorSchema);

    const errorResponse: ErrorResponse = await response.json();

    if (errorResponse.status === 400)
        throw new BadRequestError(errorResponse.message, errorResponse.timestamp, errorResponse.path);

    if (errorResponse.status === 401)
        throw new AuthenticationError(errorResponse.message, errorResponse.timestamp, errorResponse.path);

    if (errorResponse.status === 404)
        throw new ResourceNotFoundError(errorResponse.message, errorResponse.timestamp, errorResponse.path);

    throw new RequestError(
        errorResponse.message,
        errorResponse.timestamp,
        errorResponse.status,
        errorResponse.error,
        errorResponse.path);
}

async function validateResponseBody(response: Response, schema: object): Promise<void> {

    const valid: boolean = await new AjvImpl()
    .validate(schema, response.json());

if (!valid) throw new TypeError('Response does not match JSON schema');
}

interface ErrorResponse {
    readonly timestamp: string;
    readonly status: number;
    readonly error: string;
    readonly message: string;
    readonly path: string;
}
