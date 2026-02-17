import { Component, effect, inject } from '@angular/core';
import { RegisterService } from '../../shared/data-access/register.service';
import { RegisterFormComponent } from './ui/register-form';
import { AuthService } from '../../shared/data-access/auth.service';
import { Router } from '@angular/router';

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
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
