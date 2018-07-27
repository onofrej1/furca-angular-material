import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
//import { Subject } from "rxjs/Subject";
import models from "./CrudModels";

@Injectable()
export class CrudService {
  constructor(private http: HttpClient) {}

  //private fields = new Subject<any[]>();

  private baseUrl = "http://nessbox.local:8000/";

  public getModels() {
    return models;
  }

  /*public getData(): Observable<any[]> {
    return this.data.asObservable();
  }*/

  public fetchOptions(modelName: string) {
    const url: string = this.baseUrl + modelName;

    return this.http.get<any[]>(url);
  }

  public fetchData(modelName: string) {
    const url: string = this.baseUrl + modelName;

    return this.http.get<any[]>(url); //.subscribe(data => this.data.next(data));
  }

  public save(modelName: string, model: any) {
    let method = model.id ? "put" : "post";
    let param = model.id ? "/" + model.id : "";
    const url: string = this.baseUrl + modelName + param;

    return this.http[method](url, model);
  }
}
