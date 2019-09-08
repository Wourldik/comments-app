import { environment } from '../../../../environments/environment';

import { ApiUrl } from '../enums';
import { ParamsType } from '../interfaces';

import { escapeRegExp, isArray } from 'lodash-es';
import { idIndex } from '../constants/id-index';

const id = {
  [ParamsType.id]: `[0-9]+`,
  [ParamsType.ref]: `[a-fA-F0-9]{8}\-(?:[a-fA-F0-9]{4}\-){3}[a-fA-F0-9]{12}`,
};

export function createEscapedPath(
  url: ApiUrl | [ApiUrl, ParamsType] | [ApiUrl, ParamsType, ApiUrl],
  withQueryParams: boolean = false
): RegExp {
  const queryParams = withQueryParams ? '(?:\\?.*)?' : '';

  let escapedUrl: string;

  if (isArray(url)) {
    escapedUrl = url
      .map((u, i) =>
        i === idIndex ? `/(${id[u as ParamsType]})` : escapeRegExp(u)
      )
      .join('');
  } else {
    escapedUrl = url;
  }

  return new RegExp(
    `^${escapeRegExp(environment.apiPath)}${escapedUrl}${queryParams}$`
  );
}
