import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {Team} from "../models/team.model";
import {AppService} from "../app.service";

@Injectable()
export class TeamsService {

  private apiUrl: string

  constructor(private appService: AppService, private http: HttpClient) {
    this.apiUrl = `${this.appService.apiUrl}/teams`
  }

  getTeams(): Promise<Team[]> {
    return lastValueFrom(this.http.get<Team[]>(`${this.apiUrl}`))
  }

  queryTeams(name: string): Promise<Team[]> {
    return lastValueFrom(this.http.get<Team[]>(`${this.apiUrl}/query?name=${name}`))
  }

  getTeam(id: string): Promise<Team> {
    return lastValueFrom(this.http.get<Team>(`${this.apiUrl}/${id}`))
  }

}
