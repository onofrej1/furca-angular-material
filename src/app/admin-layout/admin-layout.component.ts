import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouterModule, Routes } from "@angular/router";
import { CrudService } from "./../crud.service";

@Component({
  selector: "admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"]
})
export class AdminLayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  modelNames;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private crud: CrudService
  ) {
    this.modelNames = Object.keys(crud.getModels());
  }
}
