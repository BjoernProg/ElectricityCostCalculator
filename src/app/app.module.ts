import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ResultsComponent } from './components/electricity_cost_calculator/results/results.component';
import { ExtraComponent } from './components/electricity_cost_calculator/extra/extra.component';
import { ElectricityCostCalculator } from './components/electricity_cost_calculator/electricity-cost-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    ExtraComponent,
    ElectricityCostCalculator
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
