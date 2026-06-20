import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
    );
  }

  async testConnection() {
    const { data, error } = await this.supabase.auth.getSession();

    console.log(this.supabase);
    console.log(data);
    console.log(error);
  }

  async getTaches() {
    const { data, error } = await this.supabase
        .from('taches')
        .select('*');

    if (error) {
        console.error('Erreur lecture taches :', error);
        return [];
    }

    return data;
    }
}