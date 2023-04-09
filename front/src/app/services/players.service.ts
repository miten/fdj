import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import { catchError } from 'rxjs/operators';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';
import { AppService } from "../app.service";

@Injectable()
export class PlayersService {

  private apiUrl: string

  constructor(private appService: AppService, private http: HttpClient) {
    this.apiUrl = `${this.appService.apiUrl}/players`
  }

  getPlayers(): Promise<Player[]>{
    return lastValueFrom(this.http.get<Player[]>(`${this.apiUrl}`))
  }

  addPlayer(player: Player): Promise<Player>{
    return lastValueFrom(this.http.post<Player>(`${this.apiUrl}`, {data: player}))
  }

  queryPlayers(name: string): Promise<Player[]> {
    return lastValueFrom(this.http.get<Player[]>(`${this.apiUrl}/query?name=${name}`))
  }

  getThumbnails(name: string): Promise<string[]> {
    return lastValueFrom(this.http.get<string[]>(`${this.apiUrl}/thumbnails?name=${name}`))
  }

}
