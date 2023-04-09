import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable()
export class AppService {


  errorSubject = new Subject<HttpErrorResponse>()
  public apiUrl = "http://localhost:3000/api";
  constructor(public http: HttpClient) {}

}
