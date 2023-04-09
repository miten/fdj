import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../models/player.model";
import {AppStore} from "../app.store";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  constructor() {}

  @Input() player: Player

  ngOnInit() {
  }

}
