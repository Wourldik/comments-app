import {
  ParsedRequestUrl,
  RequestInfoUtilities,
} from 'angular-in-memory-web-api';

import { idIndex } from '../constants/id-index';
import { requestBindings } from '../constants/request-bindings';

export function parseRequestUrl(
  url: string,
  utils: RequestInfoUtilities
): ParsedRequestUrl {
  let request: ParsedRequestUrl = {
    apiBase: '',
    collectionName: '',
    id: '',
    query: new Map(),
    resourceUrl: '',
  };

  const parsed = utils.parseRequestUrl(url);

  requestBindings.forEach(r => {
    const matchResult = url.match(r.path);

    if (matchResult) {
      request = { ...parsed };
      request.collectionName = r.collectionName;
      request.id = matchResult[idIndex];
    }
  });

  return request;
}
