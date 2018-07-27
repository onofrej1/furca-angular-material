import { Component, OnInit, ViewChild } from "@angular/core";
import { CrudService } from "./../crud.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"]
})
export class CrudComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  objectKeys = Object.keys;
  tableColumns: string[];
  dataSource: MatTableDataSource<any>;
  models;
  modelName: string;
  model;
  row: null;
  form = [];
  list = [];

  constructor(
    private crud: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.crud = crud;
  }

  ngOnInit() {
    this.models = this.crud.getModels();
    this.route.params.subscribe(params => {      
      this.modelName = params["model"];
      
      this.model = this.models[this.modelName];
      this.list = this.model.list;
      this.tableColumns = [
        "id",
        ...this.list.map(field => field.field),
        "actions"
      ];
      this.fetchData();

      this.row = null;
    });
  }

  fetchData() {
    this.crud.fetchData(this.modelName).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log("Server error: " + error)
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private buildForm(row) {
    this.form = [{ name: "id", value: row.id, type: "hidden" }];
    let field;

    for (let prop of this.model.form) {
      let name = prop.name;
      let value =
        row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
      field = { value, ...prop };

      if (prop && prop.type == "relation") {
        this.fetchOptions(prop);
        field.type = "select";
      }

      /*if (prop && prop.type == "datepicker") {
        field.value = moment(row[name]).format("DD.MM.YYYY");
      }*/

      if (prop && prop.type == "pivotRelation") {
        this.fetchOptions(prop);
        field.type = "checklist";
      }
      this.form.push(field);
    }
  }

  cancel() {
    this.row = null;
  }

  fetchOptions(field) {
    this.crud.fetchOptions(field.resourceTable).subscribe(data => {
      let options = data.map(data => {
        return {
          value: data.id,
          label: data[field.show]
        };
      });
      this.form = this.form.map(
        f => (f.name == field.name ? { ...f, options } : f)
      );
    });
  }

  handleForm(values) {
    this.crud.save(this.modelName, values).subscribe(
      model => {
        this.fetchData();
        this.row = null;
      },
      error => console.log("error", error)
    );
    console.log("handle", values);
  }

  setRow(row: any) {
    this.row = row;
    this.buildForm(row);
  }
}
