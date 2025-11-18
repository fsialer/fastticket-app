import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLogged } from '../utils/token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (isLogged()) {
    return true;
  } else {
    router.navigate(['/signin'])
    return false;
  }

};
