import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  static setSavedState(state: any, localStorageKey: string) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  static getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  }
}
