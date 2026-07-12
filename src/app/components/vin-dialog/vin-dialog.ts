import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Vin } from '../../models/vin';

@Component({
  selector: 'app-vin-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './vin-dialog.html',
  styleUrl: './vin-dialog.css',
})
export class VinDialogComponent {
  vin: Vin = {
    titre: '',
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<VinDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Vin | null) {
    this.vin = data
      ? { ...data }
      : {
          titre: '',
          description: ''
        };
  }

  valider(): void {
    if (this.vin.titre?.trim() == '') {
      return;
    }
    
    this.dialogRef.close(this.vin);
  }

  annuler(): void {
    this.dialogRef.close();
  }

  get isEdition(): boolean {
    return !!this.vin.id;
  }
}
