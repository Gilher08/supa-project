import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Tache } from '../../models/tache';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { TacheDialogComponent } from '../../components/tache-dialog/tache-dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/tache-dialog/confirmation-dialog';
import { DetailDialog } from '../../components/tache-dialog/detail-dialog';

@Component({
  selector: 'app-taches',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './taches.html',
  styleUrl: './taches.css',
})
export class Taches implements OnInit {
  changeDetection: ChangeDetectionStrategy.OnPush | undefined
  taches: Tache[] = [];

  constructor(private supabaseService: SupabaseService, private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.getTaches();
  }

  async getTaches(): Promise<void> {
    const taches = await this.supabaseService.getTaches();
    this.taches = [...taches];
    this.cd.detectChanges();
  }
  
  async ajouterTache() {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '400px'
    });

    const nouvelleTache = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!nouvelleTache) {
      return;
    }

    const tacheAjoutee = await this.supabaseService.addTache(nouvelleTache);

    this.getTaches();
  }
  
  async modifierTache(tache: Tache): Promise<void> {

    const dialogRef = this.dialog.open(
      TacheDialogComponent,
      {
        width: '500px',
        data: tache
      }
    );

    const tacheModifiee = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!tacheModifiee) {
      return;
    }

    const updated = await this.supabaseService.updateTache(
      tacheModifiee
    );

    this.getTaches();
  }
  
  async supprimerTache(tache: Tache): Promise<void> {

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '400px',
        data: {
          message: `Supprimer la tâche "${tache.titre}" ?`
        }
      }
    );

    const confirme = await firstValueFrom(
      dialogRef.afterClosed()
    );

    if (!confirme) {
      return;
    }

    const ok = await this.supabaseService.deleteTache(
      tache.id!
    );

    this.getTaches();
  }
  
  async consulterTache(tache: Tache): Promise<void> {
    const dialogRef = this.dialog.open(
      DetailDialog,
      {
        width: '400px',
        data: {
          message: tache.description
        }
      }
    );
  }
  
}
