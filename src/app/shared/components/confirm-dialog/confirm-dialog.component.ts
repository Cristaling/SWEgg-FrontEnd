import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    confirmationData;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
      this.confirmationData = data;

  }

  ngOnInit() {
      if (this.confirmationData == null) {
          this.confirmationData = {
              title: 'Confirm',
              message: 'Are you sure you want to perform this action ?'
          }
      }
  }

  closeDialog() {
    this.dialogRef.close('cancel');
  }

    confirm() {
        this.dialogRef.close('ok');

    }
}
