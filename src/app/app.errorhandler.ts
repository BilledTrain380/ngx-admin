import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {NoConnectionError} from './app.errors';

/**
 * Global error handler to handle all un-catch errors.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(
        private readonly injector: Injector,
        private readonly ngZone: NgZone,
    ) {}

    handleError(error: any): void {

        this.ngZone.run(() => {

            if (error instanceof NoConnectionError) {
                this.injector.get(Router).navigate(['pages/miscellaneous/no-connection']);
            }

            // TODO: else log error or sent it back to the server.
        });
    }
}
