import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {AppStore} from "../app.store";

class DialogData {
  error: HttpErrorResponse
}

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})


export class ErrorDialogComponent {

  constructor(private store: AppStore, public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  close(): void {
    this.dialogRef.close();
  }

  onSubmit() {
  }
}
