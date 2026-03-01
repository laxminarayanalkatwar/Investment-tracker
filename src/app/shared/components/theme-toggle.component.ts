import { Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="toggle()">
      {{theme.darkMode() ? '☀️ Light' : '🌙 Dark'}}
    </button>
  `
})
export class ThemeToggleComponent {

  constructor(public theme: ThemeService) {}

  toggle() {
    this.theme.toggle();
  }

}