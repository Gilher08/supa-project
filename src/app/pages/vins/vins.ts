import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vin } from '../../models/vin';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { VinDialogComponent } from '../../components/vin-dialog/vin-dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/tache-dialog/confirmation-dialog';
import { DetailDialog } from '../../components/vin-dialog/detail-dialog';

@Component({
  selector: 'app-vins',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './vins.html',
  styleUrl: './vins.css',
})
export class Vins implements OnInit {
  changeDetection: ChangeDetectionStrategy.OnPush | undefined
  vins: Vin[] = [];
  loading = false;
  selectedFile?: File;
  photoPreview?: string;
  
  constructor(private supabaseService: SupabaseService, private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
     await this.loadItems();
  }

  async loadItems() {

    this.loading = true;

    const vins = await this.supabaseService.getVins();
    this.vins = [...vins];
    this.cd.detectChanges();

    console.log(this.vins);

    this.loading = false;

  }

  photoUrl(vin: Vin): string {
    
    if (!vin.photo || vin.photo.trim() === '') {
      return 'images/no-wine.png';
    }

    return this.supabaseService.getPhotoUrl(vin.photo);

  }

  async ajouter() {
    const dialogRef = this.dialog.open(VinDialogComponent, {
      width: '400px'
    });

    const newItem = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!newItem) {
      return;
    }

    const result = await this.supabaseService.addVin(newItem);

    this.loadItems();
  }

  async modifier(item: Vin): Promise<void> {

    const dialogRef = this.dialog.open(
      VinDialogComponent,
      {
        width: '500px',
        data: item
      }
    );

    const updatedItem = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!updatedItem) {
      return;
    }

    const updated = await this.supabaseService.updateVin(updatedItem);

    this.loadItems();
  }

  async supprimer(item: Vin): Promise<void> {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '400px',
        data: {
          message: `Supprimer le vin "${item.titre}" ?`
        }
      }
    );

    const confirme = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!confirme) {
      return;
    }

    const ok = await this.supabaseService.deleteVin(item.id!);

    this.loadItems();
  }

  async consulter(item: Vin): Promise<void> {
    const dialogRef = this.dialog.open(
      DetailDialog,
      {
        width: '95%',
        data: {
          photo: item.photo
        }
      }
    );
  }

  async onFileSelected(event: Event, item: Vin) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    
    this.selectedFile = await this.compressImage(file);
    
    if (this.selectedFile) {
        const photo = await this.supabaseService.uploadPhoto(this.selectedFile, item);
    }

    this.loadItems();
  }

  private async compressImage(file: File): Promise<File> {

    return new Promise((resolve, reject) => {

      const img = new Image();

      img.onload = () => {

        const MAX_SIZE = 1024;

        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_SIZE) {

          height = height * MAX_SIZE / width;
          width = MAX_SIZE;

        } else if (height > MAX_SIZE) {

          width = width * MAX_SIZE / height;
          height = MAX_SIZE;

        }

        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Canvas non supporté');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(blob => {

          if (!blob) {
            reject('Compression impossible');
            return;
          }

          resolve(
            new File(
              [blob],
              file.name.replace(/\.\w+$/, '.jpg'),
              {
                type: 'image/jpeg',
                lastModified: Date.now()
              }
            )
          );

        }, 'image/jpeg', 0.80);

      };

      img.onerror = reject;

      img.src = URL.createObjectURL(file);

    });

  }
}
