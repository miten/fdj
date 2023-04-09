import { Injectable } from "@angular/core";
import {lastValueFrom, Observable,} from "rxjs";
import {League} from '../models/league.model';
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LeaguesService {

  apiUrl: string
  constructor(private appService: AppService, private http: HttpClient) {
    this.apiUrl = `${this.appService.apiUrl}/leagues`
  }

  getLeagues(): Promise<League[]>{
    return lastValueFrom(this.http.get<League[]>(`${this.apiUrl}`))
  }

  queryLeagues(name: string): Promise<League[]> {
    return lastValueFrom(this.http.get<League[]>(`${this.apiUrl}/query?name=${name}`))
  }
}
