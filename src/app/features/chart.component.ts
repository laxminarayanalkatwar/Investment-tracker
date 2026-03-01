import { Component, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { PortfolioStore } from '../state/portfolio.store';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="card">
      <h3>Portfolio Allocation</h3>

      <canvas
        baseChart
        [data]="pieData"
        [type]="'pie'">
      </canvas>

    </div>
  `
})
export class ChartComponent {

  pieData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };

  constructor(private store: PortfolioStore) {
    effect(() => {
      const assets = this.store.assets();

      this.pieData = {
        labels: assets.map(a => a.symbol),
        datasets: [
          {
            data: assets.map(a =>
              a.currentPrice * a.quantity
            )
          }
        ]
      };
    });
  }
}