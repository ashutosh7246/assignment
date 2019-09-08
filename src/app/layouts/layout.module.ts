import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LayoutRoutingModule } from "./layout.routing";
import { LayoutComponent } from './layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    MainLayoutComponent
  ],
  exports: [ ]
})

export class LayoutModule { }
