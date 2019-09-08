import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { ICommentBackend } from '../../../pages/comments/interfaces';
import { ICommentDeleteBody } from '../../../shared/interfaces';
import { CollectionName } from '../enums';
import { finishOptions } from '../helpers';

export function commentDeleteMethod(reqInfo: RequestInfo): Observable<unknown> {
  return reqInfo.utils.createResponse$(() => {
    const db = reqInfo.utils.getDb() as {
      [key: string]: ICommentBackend[];
    };

    const comments = db[CollectionName.comments];
    const body = reqInfo.utils.getJsonBody(reqInfo.req) as ICommentDeleteBody;

    // @ts-ignore
    db[CollectionName.comments] = comments.filter(function f(o) {
      if (o.id === body.id) {
        return false;
      }

      return (o.comments = o.comments.filter(f));
    });

    return finishOptions(
      {
        status: STATUS.OK,
      },
      reqInfo
    );
  });
}
