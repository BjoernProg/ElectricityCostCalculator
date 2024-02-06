import { Component } from '@angular/core';
import { CalculatorService } from './services/calculator.service';
import { Result } from './models/result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Die Parent Komponete unter der das Ganze Progamm läuft
  title = 'Electricity_Cost_Calculator'; // Titel der Projektes
  moreExtra = true; // Boolean der mit dem Child Rechner zusammen arbeitet um zufiltern ob es erlaubt ist mehr Extra Karten hinzuzufügen
  currendCards = 0; // Anzahl der Momentanen Karten 0 zu beginn
  maxCards = 4; // Maximal mögliche Karten
  showResult = false; // Boolean ob die Rusult Komponente angezeigt werden soll

  card1 = false; // 4 Booleans ob die jeweilige Karte angezeigt werden soll
  card2 = false;
  card3 = false;
  card4 = false;

  usageInWattInput!: number; // Variable für den Verbauch in Watt
  operatingHoursPerDayInput!: number; // Variable für die laufdauer
  electricityCostPerKWHInput!: number; // Variable für die Stromkosten per kWh
  operatingDaysOfWeekSelect!: number; // Variable für die Tage an den die Geräte genuzt werden

  usageInWattExtra!: number; // Variable für den Verbauch in Watt von Extra Komponenten
  operatingHoursPerDayExtra!: number; // Variable für die laufdauer der Extra Komponenten

  resultDay!: Result; // Ergebnis für die Berechnung für einen Tag
  resultWeek!: Result; // Ergebnis für die Berechnung für eine Woche
  resultMonth!: Result; // Ergebnis für die Berechnung für einen Monat
  resultYear!: Result; // Ergebnis für die Berechnung für ein Jahr
  resultExtra1!: Result; // Ergebnis für die Berechnung für die Extra 1 Komponente
  resultExtra2!: Result; // Ergebnis für die Berechnung für die Extra 2 Komponente
  resultExtra3!: Result; // Ergebnis für die Berechnung für die Extra 3 Komponente
  resultExtra4!: Result; // Ergebnis für die Berechnung für die Extra 4 Komponente
  resultDayExtra!: Result; // Ergebnis für die Addition von einer Extra und dem Tages Ergebnis

  constructor(private calculatorService: CalculatorService) {}

  onSubmitted(formData: any) {
    // Wenn der Rechner submitted wird, wird diese Methode aufgerufen
    this.usageInWattInput = formData.usageInWattInput; // Die Werte aus der RechnerForm werden in die Lokalen Variablen gespeichert
    this.operatingHoursPerDayInput = formData.operatingHoursPerDayInput;
    this.electricityCostPerKWHInput = formData.electricityCostPerKWHInput;
    this.operatingDaysOfWeekSelect = formData.operatingDaysOfWeekSelect;

    this.calculateResult(2); // Ruft die calculateResult mit dem Parameter 2 auf.
    this.showResult = true; // Stellt den Boolean auf true, das die Ergebnisse angezeigt werden.
  }

  onSubmittedExtra(formData: any) { // Packt die ExtraFrom Values in die Lokalen Variablen
    this.usageInWattExtra = formData.usageInWattInput;
    this.operatingHoursPerDayExtra = formData.operatingHoursPerDayInput;
  }

  onAdded() { // Bestimmt welche oder ob eine Extra Komponente erscheint wenn im Rechner auf Add gedrückt wird
    if (!this.card1) {
      this.card1 = true;
      this.currendCards++;
    } else if (!this.card2 && this.card1) {
      this.card2 = true;
      this.currendCards++;
    } else if (!this.card3 && this.card2) {
      this.card3 = true;
      this.currendCards++;
    } else if (!this.card4 && this.card3) {
      this.card4 = true;
      this.currendCards++;
    }
    if (this.currendCards >= this.maxCards) {
      this.moreExtra = false;
    }
  }

  onReset(extraId: number) { // Rechent das Ergebnis zurück und Werte der Extra Komponente wenn auf reset gedrückt wird bei einer Extra Kompontente.
    switch (extraId) {
      case 1:
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra1
        );
        this.calculateResult(0);
        break;
      case 2:
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra2
        );
        this.calculateResult(0);
        break;
      case 3:
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra3
        );
        this.calculateResult(0);
        break;
      case 4:
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra4
        );
        this.calculateResult(0);
        break;
    }
  }

  onDeleted(extraId: number) { // Löscht eine Extra Komponente und Subtrahiert ihr Ergebnis
    switch (extraId) {
      case 1:
        this.card1 = false;
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra1
        );
        this.calculateResult(0);
        break;
      case 2:
        this.card2 = false;
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra2
        );
        this.calculateResult(0);
        break;
      case 3:
        this.card3 = false;
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra3
        );
        this.calculateResult(0);
        break;
      case 4:
        this.card4 = false;
        this.moreExtra = true;
        this.currendCards--;
        this.resultDay = this.calculatorService.subtractExtra(
          this.resultDay,
          this.resultExtra4
        );
        this.calculateResult(0);
        break;
    }
  }

  onResetAllCards() { // Setzt alle Karten zurück und blendet alle Komponenten aus
    this.card1 = false;
    this.card2 = false;
    this.card3 = false;
    this.card4 = false;
    this.moreExtra = true;
    this.currendCards = 0;
    this.showResult = false;
  }

  calculateResult(wayOfCalculation: number) { // Rechnet je nach übergame Parameter die Endergebnisse der Reuchnungen aus
    switch (wayOfCalculation) {
      case 1:
        this.resultDay = this.resultDayExtra;
        break;
      case 2:
        this.resultDay = this.calculatorService.calcPerDay(
          this.usageInWattInput,
          this.operatingHoursPerDayInput,
          this.electricityCostPerKWHInput
        );
        break;
    }

    this.resultWeek = this.calculatorService.calcPerWeek(
      this.resultDay,
      this.operatingDaysOfWeekSelect,
      this.electricityCostPerKWHInput
    );
    this.resultMonth = this.calculatorService.calcPerMonth(
      this.resultWeek,
      this.electricityCostPerKWHInput
    );
    this.resultYear = this.calculatorService.calcPerYear(
      this.resultMonth,
      this.electricityCostPerKWHInput
    );
  }

  calculateExtra(extra: number) { // Berechnes die Ergebnisse der Extra Komponenten
    if (extra == 1) {
      this.resultExtra1 = this.calculatorService.calcExtra(
        this.usageInWattExtra,
        this.operatingHoursPerDayExtra,
        this.electricityCostPerKWHInput
      );
      this.resultDayExtra = this.calculatorService.addExtra(
        this.resultDay,
        this.resultExtra1
      );
      this.calculateResult(1);
    } else if (extra == 2) {
      this.resultExtra2 = this.calculatorService.calcExtra(
        this.usageInWattExtra,
        this.operatingHoursPerDayExtra,
        this.electricityCostPerKWHInput
      );
      this.resultDayExtra = this.calculatorService.addExtra(
        this.resultDay,
        this.resultExtra2
      );
      this.calculateResult(1);
    } else if (extra == 3) {
      this.resultExtra3 = this.calculatorService.calcExtra(
        this.usageInWattExtra,
        this.operatingHoursPerDayExtra,
        this.electricityCostPerKWHInput
      );
      this.resultDayExtra = this.calculatorService.addExtra(
        this.resultDay,
        this.resultExtra3
      );
      this.calculateResult(1);
    } else if (extra == 4) {
      this.resultExtra4 = this.calculatorService.calcExtra(
        this.usageInWattExtra,
        this.operatingHoursPerDayExtra,
        this.electricityCostPerKWHInput
      );
      this.resultDayExtra = this.calculatorService.addExtra(
        this.resultDay,
        this.resultExtra4
      );
      this.calculateResult(1);
    }
  }
}
