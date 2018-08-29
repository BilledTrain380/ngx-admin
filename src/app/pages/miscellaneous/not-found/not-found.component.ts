import {Component, Inject} from '@angular/core';
import {PREVIOUS_ROUTE_SERVICE, PreviousRouteService} from '../../../modules/previous-route/prevous-route.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  constructor(
      private readonly router: Router,

      @Inject(PREVIOUS_ROUTE_SERVICE)
      private readonly previousRouteService: PreviousRouteService,
  ) {}

  goBack() {
      this.router.navigate([this.previousRouteService.previousUrl]);
  }
}
