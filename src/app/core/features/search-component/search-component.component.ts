import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ControlService } from './services';

@Component({
  selector: 'cm-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  viewProviders: [ControlService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponentComponent implements OnInit, OnDestroy {
  get formControl(): FormControl {
    return this.controlService.control;
  }

  @Input()
  control?: FormControl;

  @Input()
  placeholder = 'search';

  @Output()
  readonly valueChanged = new EventEmitter<string>();

  private readonly destroyed$ = new Subject<void>();

  constructor(private controlService: ControlService) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.controlService.buildControl(this.control);

    this.doOnSearchValueChanges();
  }

  private doOnSearchValueChanges(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe(value => {
        this.valueChanged.emit(value);
      });
  }
}
