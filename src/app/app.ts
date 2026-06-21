import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('supa-todo');

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const result = await this.supabaseService.testConnection();
    
    const taches = await this.supabaseService.getTaches();

    console.log(taches);
  }
}
