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
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent {
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
