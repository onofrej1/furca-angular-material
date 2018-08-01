import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { provideRoutes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { LayoutModule } from "@angular/cdk/layout";

import { FirstPageComponent } from "./first-page/first-page.component";
import { AdminComponent } from "./admin/admin.component";
import { TableComponent } from "./table/table.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { CrudComponent } from "./crud/crud.component";
import { CrudService } from "./crud.service";
import { SidebarLayoutComponent } from './sidebar-layout/sidebar-layout.component';
import { LayoutComponent } from './layout/layout.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
  
  { path: "first", component: FirstPageComponent },
  { path: "vysledky", component: ResultsComponent },
  { 
    path: 'admin', 
    //component: AdminLayoutComponent,
    children: [
      { path: "crud/:model", component: CrudComponent },      
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FirstPageComponent,
    AdminComponent,
    TableComponent,
    CrudComponent,
    DynamicFormComponent,
    LayoutComponent,
    SidebarLayoutComponent,
    ResultsComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule {}
