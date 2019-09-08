import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';

import { commentsMock } from './constants';
import { CollectionName } from './enums';
import { parseRequestUrl, responseInterceptor } from './helpers';
import { commentDeleteMethod, commentPostMethod } from './methods';

@Injectable({
  providedIn: 'root',
})
export class MockService implements InMemoryDbService {
  parseRequestUrl = parseRequestUrl;
  responseInterceptor = responseInterceptor;

  createDb(reqInfo?: RequestInfo): Observable<object> {
    return of({
      [CollectionName.comments]: commentsMock,
    });
  }

  delete(reqInfo: RequestInfo): Observable<unknown> | null {
    if (!reqInfo.collection) {
      return null;
    }

    // tslint:disable-next-line:no-small-switch
    switch (reqInfo.collectionName) {
      case CollectionName.comments: {
        return commentDeleteMethod(reqInfo);
      }

      default: {
        return null;
      }
    }
  }

  post(reqInfo: RequestInfo): Observable<unknown> | null {
    if (!reqInfo.collection) {
      return null;
    }

    // tslint:disable-next-line:no-small-switch
    switch (reqInfo.collectionName) {
      case CollectionName.comments: {
        return commentPostMethod(reqInfo);
      }

      default: {
        return null;
      }
    }
  }
}
