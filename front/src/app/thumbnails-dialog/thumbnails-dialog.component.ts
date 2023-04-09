import {Component, Inject, OnInit} from '@angular/core';
import {AppStore} from "../app.store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {data} from "autoprefixer";

class DialogData {
  name: string
}
@Component({
  selector: 'app-thumbnails-dialog',
  templateUrl: './thumbnails-dialog.component.html',
  styleUrls: ['./thumbnails-dialog.component.scss']
})
export class ThumbnailsDialogComponent implements OnInit {
  constructor(private store: AppStore, public dialogRef: MatDialogRef<ThumbnailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  thumbnails$: Observable<string[]> = this.store.thumbnails$;
  loading$: Observable<boolean> = this.store.loading$;
  ghosts = new Array(3);


  onSelect(thumbnail: string) {
    this.dialogRef.close(thumbnail)
  }

  ngOnInit() {
    this.store.getThumbnails(this.data.name)
  }
}
