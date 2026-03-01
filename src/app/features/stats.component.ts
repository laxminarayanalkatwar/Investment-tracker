import { Component } from '@angular/core';
import { PortfolioStore } from '../state/portfolio.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>Portfolio Analytics</h3>

      <div class="stat">
        Investment:
        {{store.totalInvestment() | number:'1.2-2'}}
      </div>

      <div class="stat">
        Current:
        {{store.currentValue() | number:'1.2-2'}}
      </div>

      <div
        class="stat"
        [class.green]="store.profitLoss() > 0"
        [class.red]="store.profitLoss() < 0"
      >
        Profit/Loss:
        {{store.profitLoss() | number:'1.2-2'}}
      </div>

    </div>
  `
})
export class StatsComponent {
  constructor(public store: PortfolioStore) {}
}