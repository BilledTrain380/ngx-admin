import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {

  constructor(
    private readonly activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.close();
  }
}
