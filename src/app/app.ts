import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TacheDialogComponent } from './components/tache-dialog/tache-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  taches: any[] = [];
  protected readonly title = signal('supa-todo');

  constructor(private supabaseService: SupabaseService, private dialog: MatDialog) {}

  async ngOnInit() {
    // const result = await this.supabaseService.testConnection();
    
    this.taches = await this.supabaseService.getTaches();

    console.log(this.taches);
  }

async ajouterTache() {
  const dialogRef = this.dialog.open(TacheDialogComponent, {
    width: '400px'
  });

  const titre = await dialogRef.afterClosed().toPromise();

  if (!titre) return;

  const tache = await this.supabaseService.addTache(titre);

  if (tache) {
    this.taches = [tache, ...this.taches];
  }
}
}
