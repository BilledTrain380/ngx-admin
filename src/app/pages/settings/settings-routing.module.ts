import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';

const routes: Routes = [{
    path: 'users',
    component: UsersComponent,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
