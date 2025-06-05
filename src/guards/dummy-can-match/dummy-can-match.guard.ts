import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';

export const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.98) return true;
  alert('dummyCanMatch -> You do not have access');
  return new RedirectCommand(router.parseUrl('/a19'));
};
