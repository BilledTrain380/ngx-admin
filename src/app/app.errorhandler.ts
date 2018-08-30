import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {Router} from '@angular/router';

/**
 * Global error handler to handle all un-catch errors.
 *
 * @author Nicolas Märchy <billedtrain380@gmail.com>
 * @since 1.0.0
 */
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(
        private readonly injector: Injector,
        private readonly ngZone: NgZone,
    ) {
        super();
    }

    handleError(error: any): void {

        this.ngZone.run(() => {

            // because error handling in js sucks really hard, we have to hack the error type
            if (error.toString().search(/.*NoConnectionError.*/) > 0) {
                this.injector.get(Router).navigate(['pages/miscellaneous/no-connection']);
            }

            // TODO: sent it back to the server.
            super.handleError(error);
        });
    }
}
