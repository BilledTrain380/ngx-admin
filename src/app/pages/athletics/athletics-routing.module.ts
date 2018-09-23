import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from './results/results.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{
    path: 'results',
    component: ResultsComponent,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AthleticsRoutingModule {}
