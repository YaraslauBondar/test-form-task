import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestInputComponent } from './components/test-input/test-input.component';
import { TestSelectComponent } from './components/test-select/test-select.component';
import { TestNumberComponent } from './components/test-number/test-number.component';
import { TestCheckboxComponent } from './components/test-checkbox/test-checkbox.component';
import { ReactiveFormsModule } from "@angular/forms";
import { GeneralFormComponent } from './components/general-form/general-form.component';
import { FormApiService } from './services/form-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TestInputComponent,
    TestSelectComponent,
    TestNumberComponent,
    TestCheckboxComponent,
    GeneralFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
