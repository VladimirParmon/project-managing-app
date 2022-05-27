import { Injectable } from '@angular/core';
import { StoreUser } from 'src/app/redux/models/store.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  static setSavedState(state: StoreUser | string, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  static getSavedState(localStorageKey: string): StoreUser | Object {
    return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  }

  static setIndividualKey(data: string, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, data);
  }

  static getIndividualKey(localStorageKey: string): StoreUser | null {
    return JSON.parse(localStorage.getItem(localStorageKey) || '');
  }

  static clearSavedState(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }
}
