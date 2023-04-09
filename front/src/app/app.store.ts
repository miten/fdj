import { Injectable } from '@angular/core';
import {Team} from "./models/team.model";
import {Player} from "./models/player.model";
import {Store} from "./store";
import {distinctUntilChanged, map} from "rxjs";
import {League} from "./models/league.model";
import {TeamsService} from "./services/teams.service";
import {PlayersService} from "./services/players.service";
import {LeaguesService} from "./services/leagues.service";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})


export class FdjState {
  teams: Team[] = []
  team: Team | null

  players: Player[]
  player: Player

  leagues: League[]
  league: League

  searchResults: string[] = []
  query: string

  loading: boolean

  thumbnails: string[]
}

@Injectable()
export class AppStore extends Store<FdjState> {
  public readonly teams$ = this.state$.pipe(map((s) => s.teams), distinctUntilChanged());

  public readonly team$ = this.state$.pipe(map((s) => s.team), distinctUntilChanged());

  public readonly players$ = this.state$.pipe(map((s) => s.players), distinctUntilChanged());

  public readonly player$ = this.state$.pipe(map((s) => s.player), distinctUntilChanged());

  public readonly leagues$ = this.state$.pipe(map((s) => s.leagues), distinctUntilChanged());

  public readonly league$ = this.state$.pipe(map((s) => s.league), distinctUntilChanged());

  public readonly searchResult$ = this.state$.pipe(map(s => s.searchResults), distinctUntilChanged());

  public readonly loading$ = this.state$.pipe(map(s => s.loading));

  public readonly thumbnails$ = this.state$.pipe(map(s => s.thumbnails));

  constructor(private appService: AppService, private teamsService: TeamsService, private playersService: PlayersService, private leaguesService: LeaguesService) {
    super(new FdjState());
  }

  public async getTeams() {
    this.setState({ ...this.state, loading: true})
    const teams = await this.teamsService.getTeams()
      this.setState({
        ...this.state,
        teams: teams,
        loading: false
      });
  }

  public async queryTeams(name: string) {
    const teams = await this.teamsService.queryTeams(name)
      this.setState({
        ...this.state,
        teams: teams,
        searchResults: name.length ? teams.map(t => t.name) : [],
      });
  }


  public async getTeam(id: string) {
    this.setState({ ...this.state, loading: true})
    const team = await this.teamsService.getTeam(id)
      this.setState({
        ...this.state,
        team: team,
        loading: false
      });
  }


  public async getPlayers() {
    this.setState({ ...this.state, loading: true})
    const players = await this.playersService.getPlayers()
      this.setState({
        ...this.state,
        players: players,
        loading: false
    });
  }

  public async addPlayer(player: Player) {
      this.setState({ ...this.state, loading: true})
      const p = await this.playersService.addPlayer(player)
      this.setState({
        ...this.state,
        players: [...this.state.players, p],
        loading: false
      })
  }

  public async getThumbnails(playerName: string) {
    this.setState({ ...this.state, loading: true})
    const thumbnails = await this.playersService.getThumbnails(playerName)
    this.setState({
      ...this.state,
      thumbnails: thumbnails,
      loading: false
    })
  }

  public async queryPlayers(name: string) {
    const players = await this.playersService.queryPlayers(name)
    this.setState({
      ...this.state,
      players: players,
      searchResults: name.length ? (players.map(t => t.name).length ? players.map(t => t.name) : ['Aucun resultat']) : [],
    });
  }

  public async getLeagues() {
    this.setState({ ...this.state, loading: true})
    const leagues = await this.leaguesService.getLeagues()
      this.setState({
        ...this.state,
        leagues: leagues,
        loading: false
    });
  }


  public async queryLeaguesNames(name: string) {
    const leagues = await this.leaguesService.queryLeagues(name)
      this.setState({
        ...this.state,
        searchResults: name.length ? (leagues.map(l => l.name).length ? leagues.map(l => l.name) : ['Aucun résultat']) : [],
      });
  }

  public async queryLeagues(name: string) {
    const leagues = await this.leaguesService.queryLeagues(name)
      this.setState({
        ...this.state,
        leagues: leagues,
        teams: leagues.flatMap(l => l.teams),
        searchResults: name.length ? (leagues.map(l => l.name).length ? leagues.map(l => l.name) : ['Aucun résultat']) : [],
      });
  }
}
