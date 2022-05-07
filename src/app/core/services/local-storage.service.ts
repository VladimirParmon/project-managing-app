import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  static setSavedState(state: StoreUser, localStorageKey: string): void {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  static getSavedState(localStorageKey: string): StoreUser | Object {
    return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  }
}
