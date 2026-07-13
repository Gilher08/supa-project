import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Tache } from '../models/tache';
import { Vin } from '../models/vin';

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

  async addTache(tache: Tache): Promise<Tache | null> {
    const { data, error } = await this.supabase
      .from('taches')
      .insert([{ titre: tache.titre, description: tache.description }])
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
        description: tache.description
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

  async getVins(): Promise<Vin[]> {
    const { data, error } = await this.supabase
      .from('vins')
      .select('*')
      .order('titre');

    if (error) {
      console.error(error);
      return [];
    }

    return data as Vin[];
  }

  async addVin(vin: Vin): Promise<Vin | null> {
    const { data, error } = await this.supabase
      .from('vins')
      .insert([
        {
          titre: vin.titre,
          description: vin.description,
          photo: vin.photo
        }
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data as Vin;
  }

  async updateVin(vin: Vin): Promise<Vin | null> {
    const { data, error } = await this.supabase
      .from('vins')
      .update({
        titre: vin.titre,
        description: vin.description,
        photo: vin.photo
      })
      .eq('id', vin.id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data as Vin;
  }

  async deleteVin(id: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('vins')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  getPhotoUrl(path: string): string {
    return this.supabase.storage
      .from('photos')
      .getPublicUrl(path)
      .data.publicUrl;
  }

  async uploadPhoto(file: File, item: Vin): Promise<string | null> {

    const fileName = `vins/${Date.now()}-${file.name}`;

    const { error } = await this.supabase.storage
        .from('photos')
        .upload(fileName, file);

    if (error) {
        console.error(error);
        return null;
    }

    item.photo = fileName;

    await this.updateVin(item);

    return fileName;

  }
}