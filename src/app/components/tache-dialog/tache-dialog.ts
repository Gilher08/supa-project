import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Tache } from '../../models/tache';

@Component({
  selector: 'app-tache-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './tache-dialog.html'
})
export class TacheDialogComponent {

  tache: Tache = {
    id: 0,
    titre: '',
    description: ''
  };

  constructor(private dialogRef: MatDialogRef<TacheDialogComponent>) {}

  valider() {
    if (!this.titre.trim()) return;

    this.dialogRef.close(this.titre, this.description);
  }
}