import { ApiUrl, CollectionName } from '../enums';
import { createEscapedPath } from '../helpers/create-escaped-path';

export const requestBindings = [
  {
    path: createEscapedPath(ApiUrl.comments),
    collectionName: CollectionName.comments,
  },
];
