import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail-dialog',
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-dialog.html',
  styleUrl: './detail-dialog.css',
})
export class DetailDialog {

  message: string;

  constructor(
    private dialogRef: MatDialogRef<DetailDialog>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data.message;
  }

  annuler(): void {
    this.dialogRef.close(false);
  }
}
