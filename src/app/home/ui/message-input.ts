import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../shared/interfaces/message';

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule],
  template: `
    <form
      [formGroup]="messageInputForm"
      (ngSubmit)="
        message.emit(messageInputForm.getRawValue().message || ''); messageInputForm.reset()
      "
    >
      <input id="message" formControlName="message" placeholder="message..." type="text" />
      <button mat-button type="submit" [disabled]="!messageInputForm.valid">
        <mat-icon>send</mat-icon>
      </button>
    </form>
  `,
  styles: [
    `
      :host {
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        background: var(--white);
        border: none;
        font-size: 1.2em;
        padding: 2rem 1rem;
      }

      button {
        height: 100% !important;
        position: absolute;
        right: 0;
        bottom: 0;

        mat-icon {
          margin-right: 0;
        }
      }
    `,
  ],
})
export class MessageInputComponent {
  formBuilder = inject(FormBuilder);
  message = output<Message['content']>();

  messageInputForm = this.formBuilder.nonNullable.group({
    message: ['', Validators.required],
  });
}
