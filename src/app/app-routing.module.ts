import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//Zuständig für die Pfade des App
const routes: Routes = [
  { path: '', redirectTo: '/electricity-cost-calculator', pathMatch: 'full' },
  {
    path: 'electricity-cost-calculator',
    component: AppComponent,
  },
  { path: `**`, redirectTo: '/electricity-cost-calculator' },
];
//Egal was angegeben wird oder falls der Pfad leer gelassen wird, wird der user auf '/electricity-cost-calculator' umgeleitet
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
