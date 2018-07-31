import { Component, ViewChild, OnInit } from '@angular/core';
import { CrudService } from "./../crud.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  tableColumns: string[] = ['start_number', 'runner'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private crud: CrudService,
  ) {
    this.crud = crud;
  }

  ngOnInit() {
      this.fetchData();
  }

  fetchData() {
    this.crud.fetchData('result?with=runner').subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log("Server error: " + error)
    );
  }

}
