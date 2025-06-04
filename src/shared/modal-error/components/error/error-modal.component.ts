import { Component, inject, input } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { ErrorService } from '../../service/error.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.scss',
    imports: [ModalComponent]
})
export class ErrorModalComponent {
  title = input<string>();
  message = input<string>();
  private errorService = inject(ErrorService);

  onClearError() {
    this.errorService.clearError();
  }
}
