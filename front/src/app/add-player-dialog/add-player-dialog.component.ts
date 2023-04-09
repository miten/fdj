import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Player} from "../models/player.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import {Team} from "../models/team.model";
import {AppStore} from "../app.store";
import {ThumbnailsDialogComponent} from "../thumbnails-dialog/thumbnails-dialog.component";


@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})


export class AddPlayerDialogComponent implements OnInit {

  thumbnail: boolean = false
  loading$: Observable<boolean> = this.store.loading$;
  teams$: Observable<Team[]> = this.store.teams$;
  players$: Observable<Player[]> = this.store.players$
  playerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    position: new FormControl('', [
      Validators.required,
    ]),
    born: new FormControl('', [
      Validators.required,
    ]),
    thumbnail: new FormControl('', [
      Validators.required,
    ]),
    team: new FormControl('', [
      Validators.required,
    ]),
    signin: new FormGroup({
      amount: new FormControl('',  [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5)]),
      currency: new FormControl('', Validators.required)
    })
  });

  positions = [
    'Forward',
    'Midfielder',
    'goal',
    'attacking'
  ]

  currencys = [
    'dollars',
    'euro',
    'gpb',
  ]

  constructor(private store: AppStore, public dialogRef: MatDialogRef<AddPlayerDialogComponent>, public dialog: MatDialog) {
  }

  async openThumbnailsPopUp() {
    const dialogRef = this.dialog.open(ThumbnailsDialogComponent, {
      width: '90vw',
      height: '90vh',
      data: {
        name: this.playerForm.get('name').value,
      },
    })

    await dialogRef.afterClosed().toPromise().then(result => {
      this.store.setState({
        ...this.store.state,
        thumbnails: []
      })
      this.playerForm.get('thumbnail').setValue(result);
    });
  }

  async send() {
    if (this.playerForm.valid) {
      await this.store.addPlayer(this.playerForm.value)
      this.dialogRef.close()
    }
  }

  async ngOnInit() {
    if (!this.store.state.teams.length) await this.store.getTeams();
  }

}
