 import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppStore} from "../app.store";
import {Observable} from "rxjs";
import {Team} from "../models/team.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit{



  constructor(private store: AppStore) {}

  ghosts = new Array(3);
  teams$: Observable<Team[]> = this.store.teams$;
  loading$: Observable<boolean> = this.store.loading$;


  ngOnInit() {
    this.store.getTeams();
  }
}
