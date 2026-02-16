import { Component, inject } from '@angular/core';
import { RegisterService } from '../../shared/data-access/register.service';
import { RegisterFormComponent } from './ui/register-form';

@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  providers: [RegisterService],
  template: `
    <div class="container gradient-bg">
      <app-register-form
        [status]="registerService.status()"
        (register)="registerService.createUser$.next($event)"
      />
    </div>
  `,
  styles: [],
})
export default class RegisterComponent {
  public registerService = inject(RegisterService);
}
