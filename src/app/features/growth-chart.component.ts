import { Component, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { PortfolioStore } from '../state/portfolio.store';

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="card">
      <h3>Portfolio Growth</h3>

      <canvas
        baseChart
        [data]="lineData"
        [type]="'line'">
      </canvas>
    </div>
  `
})
export class GrowthChartComponent {

  lineData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Portfolio Value'
      }
    ]
  };

  constructor(private store: PortfolioStore) {
    effect(() => {
      const history = this.store.priceHistory();

      this.lineData = {
        labels: history.map((_, i) => i.toString()),
        datasets: [
          {
            data: history,
            label: 'Portfolio Value'
          }
        ]
      };
    });
  }
}