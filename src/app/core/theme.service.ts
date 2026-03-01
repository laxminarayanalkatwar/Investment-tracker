import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = signal(this.loadTheme());

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      document.body.classList.toggle('dark', isDark);
      localStorage.setItem('darkMode', JSON.stringify(isDark));
    });
  }

  toggle() {
    this.darkMode.update(v => !v);
  }

  private loadTheme(): boolean {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  }
}