import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImportComponent} from './import/import.component';

@Component({
  selector: 'ngx-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {

  constructor(
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  showImportModal(): void {
    this.modalService.open(ImportComponent, {size: 'lg', container: 'nb-layout'});
  }
}
