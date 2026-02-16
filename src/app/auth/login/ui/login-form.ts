import { LoginStatus } from './../../../shared/data-access/login.service';
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Credentials } from '../../../shared/interfaces/credentials';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" #form="ngForm">
      <mat-form-field appearance="fill">
        <mat-label>email</mat-label>
        <input matNativeControl formControlName="email" type="email" placeholder="email" />
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>
      <mat-form-field>
        <mat-label>password</mat-label>
        <input matNativeControl formControlName="password" type="password" placeholder="password" />
        <mat-icon matPrefix>lock</mat-icon>
      </mat-form-field>

      <button
        mat-raised-button
        color="accent"
        type="submit"
        [disabled]="status() === 'authenticating'"
      >
        Submit
      </button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button {
        width: 100%;
      }

      mat-error {
        margin: 5px 0;
      }

      mat-spinner {
        margin: 1rem 0;
      }
    `,
  ],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginFormComponent {
  status = input.required<LoginStatus>();
  login = output<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const raw = this.loginForm.getRawValue();
      const email = raw.email || '';
      const password = raw.password || '';
      this.login.emit({ email: email, password: password });
    }
  }
}
