import { Component, inject } from '@angular/core';
import { MessageListComponent } from './ui/message-list';
import { MessageService } from '../shared/data-access/message.service';

@Component({
  selector: 'app-home',
  imports: [MessageListComponent],
  template: `
    <div class="container">
      <app-message-list [messages]="messageService.messages()" />
    </div>
  `,
})
export default class HomeComponent {
  messageService = inject(MessageService);
}
