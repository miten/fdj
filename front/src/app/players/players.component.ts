import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, forkJoin, map, merge, Observable} from "rxjs";
import {AppStore} from "../app.store";
import {Player} from "../models/player.model";
import {MatDialog} from "@angular/material/dialog";
import {AddPlayerDialogComponent} from "../add-player-dialog/add-player-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})


export class PlayersComponent implements OnInit {

  @Input() addButton = true
  players$: Observable<Player[]> = this.store.players$;
  loading$: Observable<boolean> = this.store.loading$;
  ghosts = new Array(3);

  constructor(private store: AppStore, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }





  ngOnInit() {
    this.store.getPlayers();
  }
}
