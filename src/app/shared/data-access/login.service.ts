import { computed, inject, Injectable, signal } from '@angular/core';
import { EMPTY, merge, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Credentials } from './../interfaces/credentials';
import { connect } from 'ngxtension/connect';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginService {
  private authService = inject(AuthService);

  // sources
  error$ = new Subject<any>();
  loginUser$ = new Subject<Credentials>();
  userLoggedIn$ = this.loginUser$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          console.log('ERROR', err);
          return EMPTY;
        }),
      ),
    ),
  );

  // state
  private state = signal<LoginState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    const nextState$ = merge(
      this.userLoggedIn$.pipe(map(() => ({ status: 'success' as const }))),
      this.loginUser$.pipe(map(() => ({ status: 'authenticating' as const }))),
      this.error$.pipe(map(() => ({ status: 'error' as const }))),
    );

    connect(this.state).with(nextState$);
  }
}
