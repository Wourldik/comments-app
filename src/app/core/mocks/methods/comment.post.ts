import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { ICommentBackend } from '../../../pages/comments/interfaces';
import { ICommentPostBody } from '../../../shared/interfaces';
import { CollectionName } from '../enums';
import { finishOptions } from '../helpers';

export function commentPostMethod(reqInfo: RequestInfo): Observable<unknown> {
  const db = reqInfo.utils.getDb() as {
    [key: string]: ICommentBackend[];
  };

  const comments = db[CollectionName.comments];

  const body = reqInfo.utils.getJsonBody(reqInfo.req) as ICommentPostBody;

  // @ts-ignore
  db[CollectionName.comments] = comments.filter(function f(o) {
    if (o.id === body.id) {
      const newId = o.id + 1;

      o.comments.push({ id: newId, text: body.text, comments: [] });

      return true;
    }

    return (o.comments = o.comments.filter(f));
  });

  return reqInfo.utils.createResponse$(() => {
    return finishOptions(
      {
        status: STATUS.OK,
      },
      reqInfo
    );
  });
}
