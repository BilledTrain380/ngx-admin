import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {filter, takeWhile} from 'rxjs/operators';
import {User} from '../../../modules/user/user-models';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ChangePasswordComponent} from '../../../modules/user/change-password/change-password.component';
import {USER_SUPPLIER, UserSupplier} from '../../../modules/user/user-providers';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private alive: boolean = true;

    @Input() position = 'normal';

    user: User;

    userMenu = [
        {
            title: 'Change Password',
            data: {
                click: function () {

                    const modal: NgbModalRef = this.modalService.open(ChangePasswordComponent, {
                        size: 'lg', container: 'nb-layout',
                    });

                    modal.componentInstance.user = this.user;
                },
            },
        },
        {title: 'Log out'}, // TODO: Log out user
    ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,

              @Inject(USER_SUPPLIER)
              private readonly userSupplier: UserSupplier,

              private analyticsService: AnalyticsService,
              private readonly modalService: NgbModal,
  ) {}

    ngOnInit() {

        this.userSupplier.getActiveUser()
            .pipe(takeWhile(() => this.alive))
            .forEach(user => {
                this.user = user;
            });

        this.menuService.onItemClick()
            .pipe(filter(({ tag }) => tag === 'user-context-menu'))
            // .pipe(map(({item: { title }}) => title))
            .subscribe(({ item }) => {
                if (item.data && item.data.click) item.data.click.apply(this);
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }
}
