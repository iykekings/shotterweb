import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [InputComponent]
})
export class FeatureModule { }
