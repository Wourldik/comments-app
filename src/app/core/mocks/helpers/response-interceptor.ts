import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

import { finishOptions } from './finish-options';

export function responseInterceptor(
  resOptions: ResponseOptions,
  reqInfo: RequestInfo
): ResponseOptions {
  return finishOptions(resOptions, reqInfo);
}
