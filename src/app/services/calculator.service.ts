import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  // Dieser Service kümmert sich um die Rechnungen für den Verbauch, Die Kosten und die Rundungen eben jehner.
  calcPerDay(watt: number, hours: number, elecCosts: number) {
    // Berechnet den Verbrauch und die Kosten für einen Tag.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = (watt * hours) / 1000;
    result.usageResult = this.round(result.usageResult);
    result.costsResult = this.round(+result.usageResult * elecCosts);
    return result;
  }

  calcPerWeek(resultDay: Result, operatingDays: number, elecCosts: number) {
    // Berechnet den Verbrauch und die Kosten für eine Woche.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = resultDay.usageResult * operatingDays;
    result.usageResult = this.round(result.usageResult);
    result.costsResult = this.round(+result.usageResult * elecCosts);
    return result;
  }

  calcPerMonth(resultWeek: Result, elecCosts: number) {
    // Berechnet den Verbrauch und die Kosten für einen Monat.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = resultWeek.usageResult * 4;
    result.usageResult = this.round(result.usageResult);
    result.costsResult = this.round(+result.usageResult * elecCosts);
    return result;
  }

  calcPerYear(resultMonth: Result, elecCosts: number) {
    // Berechnet den Verbrauch und die Kosten für ein Jahr.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = resultMonth.usageResult * 13;
    result.usageResult = this.round(result.usageResult);
    result.costsResult = this.round(+result.usageResult * elecCosts);
    return result;
  }

  calcExtra(watt: number, hours: number, elecCosts: number) {
    // Berechnet den Verbrauch und die Kosten für ExtraKomponenten.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = (watt * hours) / 1000;
    result.usageResult = this.round(result.usageResult);
    result.costsResult = this.round(+result.usageResult * elecCosts);
    return result;
  }

  subtractExtra(resultDay: Result, resultExtra: Result) {
    // Berechnet den Abzug von Verbrauch und Kosten auf das Endergebniss wenn eine Extra Komponenten gelöscht oder zurückgesetzt wird.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = this.round(
      +resultDay.usageResult - +resultExtra.usageResult
    );
    result.costsResult = this.round(
      +resultDay.costsResult - +resultExtra.costsResult
    );

    return result;
  }

  addExtra(resultDay: Result, resultExtra: Result) {
    // Addiert das Momentane Endergebniss mit dem Ergebniss der ExtraKomponente.
    let result: Result = {
      usageResult: 0,
      costsResult: 0,
    };

    result.usageResult = this.round(
      +resultDay.usageResult + +resultExtra.usageResult
    );
    result.costsResult = this.round(
      +resultDay.costsResult + +resultExtra.costsResult
    );

    return result;
  }
  round(value: number) {
    // Runden auf 2 Stellen hinterm Komma bzw. Punkt.
    var result: any;
    result = (Math.round(value * 100) / 100).toFixed(2);
    return result;
  }
}
