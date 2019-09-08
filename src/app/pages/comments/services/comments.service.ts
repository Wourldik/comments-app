import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ApiUrl } from '../../../core/mocks/enums';
import {
  ICommentDeleteBody,
  ICommentPostBody,
} from '../../../shared/interfaces';
import { ICommentBackend } from '../interfaces';
import { Comment, Comments } from '../models';

@Injectable()
export class CommentsService {
  readonly added = new Subject<{ id: number; text: string }>();
  readonly removed = new Subject<number>();

  constructor(private httpClient: HttpClient) {}

  add(value: string, id: number): Observable<boolean> {
    const body: ICommentPostBody = {
      id,
      text: value,
    };

    return this.httpClient
      .request<null>('post', `${environment.apiPath}${ApiUrl.comments}`, {
        body,
      })
      .pipe(mapTo(true));
  }

  getAll(): Observable<Comments | null> {
    return this.httpClient
      .get<ICommentBackend[]>(`${environment.apiPath}${ApiUrl.comments}`)
      .pipe(
        map(res => res.map(comment => Comment.fromBackendFactory(comment)))
      );
  }

  remove(id: number): Observable<boolean> {
    const body: ICommentDeleteBody = {
      id,
    };

    return this.httpClient
      .request<null>('delete', `${environment.apiPath}${ApiUrl.comments}`, {
        body,
      })
      .pipe(mapTo(true));
  }
}
