import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_SERVICE, CorsHttpService, CorsRestService, REST_SERVICE} from './http-service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    providers: [
        {
            provide: REST_SERVICE,
            useClass: CorsRestService,
        },
        {
            provide: HTTP_SERVICE,
            useClass: CorsHttpService,
        },
    ],
})
export class HttpModule {
}
