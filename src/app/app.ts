import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TacheDialogComponent } from './components/tache-dialog/tache-dialog';
import { firstValueFrom } from 'rxjs';
import { Tache } from './models/tache';
import { ConfirmationDialogComponent } from './components/tache-dialog/confirmation-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  taches: Tache[] = [];

  protected readonly title = signal('supa-todo');

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

    if (tacheAjoutee) {
      this.getTaches();
    }
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

    if (!updated) {
      return;
    }

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
}
