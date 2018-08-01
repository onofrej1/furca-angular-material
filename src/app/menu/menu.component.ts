import { Component, OnInit } from '@angular/core';
import { CrudService } from "./../crud.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems;

  constructor(
    private crud: CrudService,
  ) {
    this.crud = crud;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.crud.fetchData('menuItem?with=parent,page').subscribe(
      data => {
        this.menuItems = [];
        let rootItems = data.filter(menu => menu.parent_id == null);

        for (let i in rootItems) {
          let menuItem = rootItems[i];
          let item = {
            item: menuItem,
            children: data.filter(i => i.parent_id === menuItem.id)
          };
          this.menuItems.push(item);
        }

        console.log(this.menuItems);
      },
      error => console.log("Server error: " + error)
    );
  }

}
