import {Component, OnDestroy} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';
import {takeWhile} from 'rxjs/operators';

@Component({
    selector: 'ngx-pages',
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})
export class PagesComponent implements OnDestroy {

    readonly menu = MENU_ITEMS;

    private alive: boolean = true;

    constructor(
        accessChecker: NbAccessChecker,
        authService: NbAuthService,
    ) {

        // listens on token change to change ACL of the menu items
        authService.onTokenChange()
            .pipe(takeWhile(() => this.alive))
            .forEach(it => {

                this.menu.forEach(item => {
                    const canShow: boolean = item.data === undefined
                        || item.data.canShow === undefined
                        || item.data.canShow(accessChecker);
                    item.hidden = !canShow;
                });
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
