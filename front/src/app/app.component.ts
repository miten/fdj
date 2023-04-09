import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, fromEvent, Observable, Subject, tap} from "rxjs";
import {AppStore} from "./app.store";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {GlobalHttpInterceptorService} from "./services/GlobalHttpInterceptorService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDialogComponent} from "./error-dialog/error-dialog.component";
import {AppService} from "./app.service";
import {Location} from "@angular/common";
import {Team} from "./models/team.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  navigation = [
    { icon: 'sports_soccer', label: 'teams', link: 'teams' },
    { icon: 'groups', label: 'joueurs', link: 'players' },
  ]
  team$: Observable<Team | null> = this.store.team$;
  search$: Observable<string[]> = this.store.searchResult$;
  @ViewChild('input') input: ElementRef;
  myControl = new FormControl<string>('');
  dialogRef: MatDialogRef<ErrorDialogComponent>;
  subscribions: any


  constructor(private store: AppStore, public route: Router,
              public globalHttpInterceptorService: GlobalHttpInterceptorService,
              private dialog: MatDialog,
              private appService: AppService,
              public location: Location) {}


  public queryName(v: string) {
    this.store.queryLeagues(v)
  }

  public openErrorDialog(error: HttpErrorResponse) {
    this.dialogRef = this.dialog.open(ErrorDialogComponent, {
      height: '60vh',
      width: '60vw',
      data: {
        error
      }
    });
  }



  ngOnInit() {
    this.appService.errorSubject.pipe(filter(v => v !== undefined)).subscribe(e => this.openErrorDialog(e))
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(e => {
        if (this.input.nativeElement.value === '') this.store.getTeams();
        if (this.route.url.endsWith('teams')) this.store.queryLeaguesNames(this.input.nativeElement.value)
        if (this.route.url.endsWith('players')) this.store.queryPlayers(this.input.nativeElement.value)
        if (this.route.url.endsWith('leagues')) this.store.queryLeagues(this.input.nativeElement.value)
      });

    this.route.events.subscribe(e => {
      this.input.nativeElement.value = ''
      this.store.setState({
        ...this.store.state,
        searchResults: []
      })
    })
  }

  ngOnDestroy() {
    console.log('ok')
  }
}
