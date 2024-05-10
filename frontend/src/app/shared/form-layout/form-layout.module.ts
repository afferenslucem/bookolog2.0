import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { FormRowComponent } from './components/form-row/form-row.component';
import { FormSectionComponent } from './components/form-section/form-section.component';



@NgModule({
  declarations: [FormLayoutComponent, FormRowComponent, FormSectionComponent, FormHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [FormLayoutComponent, FormRowComponent, FormSectionComponent, FormHeaderComponent],
})
export class FormLayoutModule { }
