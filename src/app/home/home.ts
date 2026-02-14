import { Component, inject, input } from '@angular/core';
import { MessageListComponent } from './ui/message-list';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from './ui/message-input';

@Component({
  selector: 'app-home',
  imports: [MessageListComponent, MessageInputComponent],
  template: `
    <div class="container">
      <app-message-list [messages]="messageService.messages()" />
      <app-message-input (message)="messageService.add$.next($event)" />
    </div>
  `,
})
export default class HomeComponent {
  messageService = inject(MessageService);
}
