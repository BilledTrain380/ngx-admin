import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_SERVICE, OriginHttpService, OriginRestService, REST_SERVICE} from './http-service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    providers: [
        {
            provide: REST_SERVICE,
            useClass: OriginRestService,
        },
        {
            provide: HTTP_SERVICE,
            useClass: OriginHttpService,
        },
    ],
})
export class HttpModule {
}
