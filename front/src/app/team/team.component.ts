import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../app.store";
import {Observable} from "rxjs";
import {Team} from "../models/team.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  constructor(private store: AppStore, public route: Router, public activatedRoute: ActivatedRoute) {}

  team$: Observable<Team | null> = this.store.team$;
  loading$: Observable<boolean> = this.store.loading$;
  ghosts = new Array(3);


  ngOnInit() {
    this.store.getTeam(this.activatedRoute.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.store.setState({
      ...this.store.state,
      team: null
    })
  }
}
