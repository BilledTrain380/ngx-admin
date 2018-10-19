import {Component, OnDestroy, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';
import {takeWhile} from 'rxjs/operators';
import {NbMenuItem} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'ngx-pages',
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})
export class PagesComponent implements OnInit, OnDestroy {

    readonly menu = MENU_ITEMS;

    private alive: boolean = true;

    constructor(
        private readonly translate: TranslateService,
        accessChecker: NbAccessChecker,
        authService: NbAuthService,
    ) {

        // listens on token change to change ACL of the menu items
        authService.onTokenChange()
            .pipe(takeWhile(() => this.alive))
            .forEach(it => {

                this.menu
                    .filter(item => item.data !== undefined && item.data.canShow !== undefined)
                    .forEach(item => {

                        const canShowObservable: Observable<boolean> = item.data.canShow(accessChecker);

                        canShowObservable
                            .pipe(takeWhile(() => this.alive))
                            .forEach(canShow => {
                                item.hidden = !canShow;
                            });
                    });
            });
    }

    ngOnInit(): void {

        this.menu.forEach(it => this.translateMenuItem(it));
    }

    private translateMenuItem(item: NbMenuItem): void {

        if (item.data && item.data.translation) {

            this.translate.get(item.data.translation).subscribe(it => {
                item.title = it;
            });
        }

        if (item.children) {
            item.children.forEach(it => this.translateMenuItem(it));
        }
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
