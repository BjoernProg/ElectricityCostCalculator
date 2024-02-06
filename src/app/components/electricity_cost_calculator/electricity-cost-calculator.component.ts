import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-electricity-cost-calculator',
  templateUrl: './electricity-cost-calculator.component.html',
  styleUrls: ['./electricity-cost-calculator.component.scss'],
})
export class ElectricityCostCalculator { // Die Child Hauptkomponente der Stromkostenrechner
  weekdays: number[] = [1, 2, 3, 4, 5, 6, 7]; // Array um anzahl der Wochentage festzuhalten.
  @Output() submitForm: EventEmitter<any> = new EventEmitter(); // Event Emitter um Werte und Signale zur Parent Komponente zu schicken.
  @Output() addCard: EventEmitter<any> = new EventEmitter();
  @Output() resetAllCards: EventEmitter<any> = new EventEmitter();
  @Input() moreExtra = true; // Boolean welcher prüft ob es gerade erlaubt ist mehr Karten zu erstellen

  constructor(private formBuilder: FormBuilder) {}

  rechnerForm: FormGroup = this.formBuilder.group({ // Initialisierung der From inklusive bennenung der HTML Elemente, der default Value und der Validatoren.
    usageInWattInput: ['', Validators.required], // Validators.reguired sorgt dafür das die Form als ungültigt gilt solange das Feld nicht ausgefüllt ist.
    operatingHoursPerDayInput: ['', Validators.required],
    electricityCostPerKWHInput: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)], //Validators.pattern(/^\d+(\.\d+)?$/) sorgt dafür das die Form als ungültigt gilt solange ein Sonderzeihen außer '.' im Feld ist.
    ],
    operatingDaysOfWeekSelect: [this.weekdays[0], Validators.required], // Der defualt Wert des Selects soll der erste wert des Arrays sein also 1
  });

  get usageInWattInputControl() {  // Die getter sind zur Error Kontroller der HTML Elemente
    return this.rechnerForm.get('usageInWattInput');
  }
  get operatingHoursPerDayInputControl() {
    return this.rechnerForm.get('operatingHoursPerDayInput');
  }
  get electricityCostPerKWHControl() {
    return this.rechnerForm.get('electricityCostPerKWHInput');
  }
  get operatingDaysOfWeekSelectControl() {
    return this.rechnerForm.get('operatingDaysOfWeekSelect');
  }

  onSubmit() {
    this.submitForm.emit(this.rechnerForm.value);
  }

  onAddCard() {
    this.addCard.emit();
  }

  onResetAllCards() {
    this.resetAllCards.emit();
    this.rechnerForm.reset();
  }
}
