import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {takeWhile} from 'rxjs/operators';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    private alive: boolean = true;

    constructor(
        private authService: NbAuthService,
    ) {}

    ngOnInit(): void {
        this.login();
    }

    login() {
        this.authService.authenticate('psa-dragon')
            .pipe(takeWhile(() => this.alive))
            .subscribe((_: NbAuthResult) => {
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

}
