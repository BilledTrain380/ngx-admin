import {Component, Input, OnInit} from '@angular/core';
import {TreeCheckbox} from './tree-checkbox-models';

@Component({
    selector: 'ngx-tree-checkbox',
    templateUrl: './tree-checkbox.component.html',
    styleUrls: ['./tree-checkbox.component.scss'],
})
export class TreeCheckboxComponent {

    @Input('root')
    readonly root: TreeCheckbox = new TreeCheckbox('');

    constructor() {}
}
