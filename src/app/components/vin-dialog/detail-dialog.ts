import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-detail-dialog',
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-dialog.html',
  styleUrl: './detail-dialog.css',
})
export class DetailDialog {
  urlPhoto: string;

  constructor(private supabaseService: SupabaseService,
    private dialogRef: MatDialogRef<DetailDialog>,
    @Inject(MAT_DIALOG_DATA) data: { photo: string }
    ) {
      this.urlPhoto = this.supabaseService.getPhotoUrl(data.photo);
    }

  annuler(): void {
    this.dialogRef.close(false);
  }
    
}
