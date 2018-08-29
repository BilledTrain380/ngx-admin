/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from './modules/http/http.module';
import {GlobalErrorHandler} from './app.errorhandler';
import {PreviousRouteModule} from './modules/previous-route/previous-route.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        HttpModule,

        PreviousRouteModule.forRoot(),
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
    ],
})
export class AppModule {
}
