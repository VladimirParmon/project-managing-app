import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public language$ = new BehaviorSubject('');

  applyLang(lang: string) {
    this.language$.next(lang);
  }
}
