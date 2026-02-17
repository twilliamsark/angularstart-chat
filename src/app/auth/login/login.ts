import { Component, effect, inject } from '@angular/core';
import { LoginFormComponent } from './ui/login-form';
import { LoginService } from '../../shared/data-access/login.service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/data-access/auth.service';

@Component({
  selector: 'app-register',
  imports: [LoginFormComponent, RouterModule, MatProgressSpinnerModule],
  providers: [LoginService],
  template: `
    <div class="container gradient-bg">
      <app-login-form
        [status]="loginService.status()"
        (login)="loginService.loginUser$.next($event)"
      />
      <a routerLink="/auth/register">Create account</a>
    </div>
  `,
  styles: [
    `
      a {
        margin: 2rem;
        color: var(--accent-darker-color);
      }
    `,
  ],
})
export default class LoginComponent {
  public loginService = inject(LoginService);
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
