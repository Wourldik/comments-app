import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  getStatusText,
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import { isPlainObject } from 'lodash-es';

export function finishOptions(
  options: ResponseOptions,
  { headers, url }: RequestInfo
) {
  if (options.status) {
    options.statusText = getStatusText(options.status);
  }

  if (headers) {
    options.headers = headers;
  }

  if (url) {
    options.url = url;
  }

  if (options.status !== STATUS.OK) {
    let error: unknown;

    if (
      isPlainObject(options.body) &&
      {}.hasOwnProperty.call(options.body, 'error')
    ) {
      error = {
        message: (options.body as { error: string }).error,
        code: options.status ? options.status.toString() : '',
      };
    } else {
      error = options.body;
    }

    return new HttpErrorResponse({
      status: options.status,
      statusText: options.statusText,
      url: options.url,
      error,
      headers: options.headers as HttpHeaders,
    }) as ResponseOptions;
  }

  return options;
}
