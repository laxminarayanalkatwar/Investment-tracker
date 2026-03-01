import { Component } from '@angular/core';
import { PortfolioStore } from '../state/portfolio.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>Advanced Analytics</h3>

      <p>
        Avg Return:
        {{store.averageReturn() | percent}}
      </p>

      <p *ngIf="store.bestPerformer()">
        Best Asset:
        {{store.bestPerformer().symbol}}
      </p>

      <p>
        Assets:
        {{store.assets().length}}
      </p>

    </div>
  `
})
export class AnalyticsComponent {
  constructor(public store: PortfolioStore) {}
}