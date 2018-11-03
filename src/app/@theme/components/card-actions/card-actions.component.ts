import {Component, Input, OnDestroy} from '@angular/core';
import {NbLayoutDirection, NbLayoutDirectionService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators';

@Component({
    selector: 'ngx-card-actions',
    templateUrl: './card-actions.component.html',
    styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent implements OnDestroy {

    @Input('actions')
    actions: ReadonlyArray<CardAction> = [];

    currentDirection: NbLayoutDirection;

    private alive: boolean = true;

    constructor(
        private readonly directionService: NbLayoutDirectionService,
    ) {
        this.currentDirection = this.directionService.getDirection();

        this.directionService.onDirectionChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe(newDirection => this.currentDirection = newDirection);
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}

export interface CardAction {
    readonly title: string;
    readonly onClick: Function;
    readonly primary?: boolean;
}
