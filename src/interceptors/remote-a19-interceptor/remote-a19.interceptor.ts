import { HttpInterceptorFn } from '@angular/common/http';

export const remoteA19Interceptor: HttpInterceptorFn = (req, next) => {
  const apiHost = 'http://localhost:4201';
  let newReq = req;
  if (!req.url.startsWith('http')) {
    newReq = req.clone({ url: apiHost + req.url });
  }
  console.log('Intercepted by remoteA19Interceptor');
  return next(newReq);
};
