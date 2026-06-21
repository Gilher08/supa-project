import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Tache } from '../models/tache';

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

  async getTaches(): Promise<Tache[]> {
    const { data, error } = await this.supabase
      .from('taches')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erreur lecture taches :', error);
      return [];
    }

    return data as Tache[];
  }

  async addTache(titre: string, description: string): Promise<Tache | null> {
    const { data, error } = await this.supabase
      .from('taches')
      .insert([{ titre, description }])
      .select()
      .single();

    if (error) {
      console.error('INSERT error:', error);
      return null;
    }

    return data as Tache;
  }

  async updateTache(tache: Tache): Promise<Tache | null> {
    const { data, error } = await this.supabase
      .from('taches')
      .update({
        titre: tache.titre,
        complete: tache.description
      })
      .eq('id', tache.id)
      .select()
      .single();

    if (error) {
      console.error('UPDATE error:', error);
      return null;
    }

    return data as Tache;
  }

   async deleteTache(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('taches')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('DELETE error:', error);
      return false;
    }

    return true;
  }

  async validerTache(id: number, status: boolean) {
    const { data, error } = await this.supabase
      .from('taches')
      .update({ status: status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('VALIDATION error:', error);
      return null;
    }

    return data;
  }
}