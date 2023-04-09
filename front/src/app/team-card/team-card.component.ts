import { Component, Input } from '@angular/core';
import {Team} from "../models/team.model";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})

export class TeamCardComponent {
  @Input() team: Team;
}
