import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import {AppStore} from "./app.store";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TeamCardComponent } from './team-card/team-card.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import {AgePipe} from "./pipe/age.pipe";
import { NotFoundComponent } from './not-found/not-found.component';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LeaguesService} from "./services/leagues.service";
import {PlayersService} from "./services/players.service";
import {TeamsService} from "./services/teams.service";
import {AppService} from "./app.service";
import {GlobalHttpInterceptorService} from "./services/GlobalHttpInterceptorService";
import {ErrorDialogComponent} from "./error-dialog/error-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ThumbnailsDialogComponent } from './thumbnails-dialog/thumbnails-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamComponent,
    TeamCardComponent,
    PlayersComponent,
    PlayerCardComponent,
    AgePipe,
    NotFoundComponent,
    AddPlayerDialogComponent,
    ErrorDialogComponent,
    ThumbnailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule

  ],
  providers: [
    GlobalHttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    AppStore,
    AppService,
    LeaguesService,
    PlayersService,
    TeamsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
