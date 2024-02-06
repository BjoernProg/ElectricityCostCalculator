import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss'],
})
export class ExtraComponent { // Child Extra Komponente bei der Optional mehrere Geräte mit eingerechnet werden können

  @Output() submitForm: EventEmitter<any> = new EventEmitter(); // Event Emitter welche Informationen oder Objekte an die Parent App Komponente weiter geben können
  @Output() deleteCard: EventEmitter<any> = new EventEmitter();
  @Output() deleteCardId: EventEmitter<any> = new EventEmitter();
  @Output() resetCardId: EventEmitter<any> = new EventEmitter();

  isEditable = true; // Boolean damit die Extra Komponente erst wieder editierbar ist sobalt der Rest Knopf gedrückt wurde.

  constructor(private formBuilder: FormBuilder) {}

  extraForm: FormGroup = this.formBuilder.group({// Initialisierung der From inklusive bennenung der HTML Elemente, der default Value und der Validatoren.
    usageInWattInput: ['', Validators.required], // Validators.reguired sorgt dafür das die Form als ungültigt gilt solange das Feld nicht ausgefüllt ist.
    operatingHoursPerDayInput: ['', Validators.required],
  });

  onSubmit() { // Beim Drücken des "GO!"" Knopfes wird die Form dem Parent übergeben durch das emitten der EventEmitter
    this.submitForm.emit(this.extraForm.value);
    this.deleteCardId.emit();
    this.isEditable = false;
  }

  onResetCard() { // Wird der Reset Knopf gedrückt werden die Werte alle zurückgesetzt und auch dem Parent bescheid gegeben
    this.extraForm.reset();
    this.resetCardId.emit();
    this.isEditable = true;
  }

  onDeleteCard() {// Wenn der Delete Knopf gedrückt wird so wird dem Parent durch den Eventemitter die Funktion zum löschen aufgerufen.
    this.deleteCard.emit();
  }

  get usageInWattInputControl() { // Die getter sind zur Error Kontroller der HTML Elemente
    return this.extraForm.get('usageInWattInput');
  }
  get operatingHoursPerDayInputControl() {
    return this.extraForm.get('operatingHoursPerDayInput');
  }
}
