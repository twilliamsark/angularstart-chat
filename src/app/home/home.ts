import { Component, inject, effect } from '@angular/core';
import { MessageListComponent } from './ui/message-list';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from './ui/message-input';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  imports: [
    MessageListComponent,
    MessageInputComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <mat-toolbar color="primary">
        <span class="spacer"></span>
        <button mat-icon-button (click)="authService.logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <app-message-list [messages]="messageService.messages()" />
      <app-message-input (message)="messageService.add$.next($event)" />
    </div>
  `,
})
export default class HomeComponent {
  messageService = inject(MessageService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
