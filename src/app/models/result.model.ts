export class Result {
  //Das Model dient zur Speicherung und übertragung der Rechnungsergebnisse
  usageResult!: number; // Das Ergebniss der Verbrauchs Rechnung
  costsResult!: number; // Das Ergebniss der Kosten Rechnung

  constructor(usageResult: number, costsResult: number) {
    this.usageResult = usageResult;
    this.costsResult = costsResult;
  }
}
