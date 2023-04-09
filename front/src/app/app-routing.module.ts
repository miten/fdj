import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamsComponent} from "./teams/teams.component";
import {TeamComponent} from "./team/team.component";
import {PlayersComponent} from "./players/players.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: TeamComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/:id', component: TeamComponent },
  { path: '', redirectTo: '/teams', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
