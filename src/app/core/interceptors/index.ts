import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
];
