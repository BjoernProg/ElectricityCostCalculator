import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() resultDay!: Result;
  @Input() resultWeek!: Result;
  @Input() resultMonth!: Result;
  @Input() resultYear!: Result;

  isEditable = true;

  usagePerDayResult!: number;
  usagePerWeekResult!: number;
  usagePerMonthResult!: number;
  usagePerYearResult!: number;
  costsPerDayResult!: number;
  costsPerWeekResult!: number;
  costsPerMonthResult!: number;
  costsPerYearResult!: number;

  ngOnInit(): void {}

  ngOnChanges() {
    this.usagePerDayResult = this.resultDay.usageResult;
    this.usagePerWeekResult = this.resultWeek.usageResult;
    this.usagePerMonthResult = this.resultMonth.usageResult;
    this.usagePerYearResult = this.resultYear.usageResult;
    this.costsPerDayResult = this.resultDay.costsResult;
    this.costsPerWeekResult = this.resultWeek.costsResult;
    this.costsPerMonthResult = this.resultMonth.costsResult;
    this.costsPerYearResult = this.resultYear.costsResult;
  }
}
