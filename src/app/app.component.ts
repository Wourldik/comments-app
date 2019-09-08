import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, repeatWhen, takeUntil, tap } from 'rxjs/operators';

import { Comments } from './pages/comments/models';
import { CommentsService } from './pages/comments/services';
import { search } from './shared/helpers';

@Component({
  selector: 'cm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [CommentsService],
})
export class AppComponent implements OnInit, OnDestroy {
  comments$?: Observable<Comments | null>;
  loadingError = false;

  private readonly destroyed$ = new Subject<void>();
  private readonly reload$ = new Subject<void>();

  private searchValue = '';

  constructor(private commentsService: CommentsService) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.comments$ = this.commentsService
      .getAll()
      .pipe(
        tap(res => (this.loadingError = !res)),
        map(res => (this.searchValue ? search(res, this.searchValue) : res))
      )
      .pipe(repeatWhen(() => this.reload$));

    this.commentsService.added
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.onAddComment(value));

    this.commentsService.removed
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.onRemoveComment(value));
  }

  onSearch(value: string): void {
    this.searchValue = value;

    this.onDataOutdated();
  }

  private onAddComment(value: { id: number; text: string }): void {
    this.commentsService
      .add(value.text, value.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.onDataOutdated());
  }

  private onDataOutdated(): void {
    this.reload$.next();
  }

  private onRemoveComment(id: number): void {
    this.commentsService
      .remove(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.onDataOutdated());
  }
}
