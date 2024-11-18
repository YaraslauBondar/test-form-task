import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralFormComponent } from './components/general-form/general-form.component';

const routes: Routes = [
  { path: '', component: GeneralFormComponent },
  { path: 'edit', component: GeneralFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
