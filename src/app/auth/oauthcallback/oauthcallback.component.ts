import {Component, OnDestroy} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-oauthcallback',
    templateUrl: './oauthcallback.component.html',
    styleUrls: ['./oauthcallback.component.scss'],
})
export class OauthcallbackComponent implements OnDestroy {

    private alive: boolean = true;

    constructor(
        private readonly authService: NbAuthService,
        private readonly router: Router,
    ) {
        this.authService.authenticate('psa-dragon')
            .pipe(takeWhile(() => this.alive))
            .subscribe((authResult: NbAuthResult) => {
                if (authResult.isSuccess() && authResult.getRedirect()) {
                    this.router.navigateByUrl(authResult.getRedirect());
                }
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
