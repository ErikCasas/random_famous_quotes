import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesViewComponent } from './components/quotes-view/quotes-view.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'quotesView', component: QuotesViewComponent},
  {path : '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
