import { Component } from '@angular/core';
import { AddAssetComponent } from './features/add-asset.component';
import { PortfolioListComponent } from './features/portfolio-list.component';
import { StatsComponent } from './features/stats.component';
import { ChartComponent } from './features/chart.component';
import { MarketService } from './core/market.service';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './features/analytics.component';
import { GrowthChartComponent } from './features/growth-chart.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AddAssetComponent,
    PortfolioListComponent,
    StatsComponent,
    ChartComponent,
    CommonModule,
    AnalyticsComponent,
    GrowthChartComponent,
    ThemeToggleComponent
  ],
  template: `
   <div class="container">

      <div style="display:flex; justify-content:space-between;">
        <h1>Investment Dashboard</h1>
        <app-theme-toggle></app-theme-toggle>
      </div>

      <div class="grid">
        <app-stats></app-stats>
        <app-analytics></app-analytics>
      </div>

      <br>

      <div class="grid">
        <app-chart></app-chart>
        <app-growth-chart></app-growth-chart>
      </div>

      <br>

      <app-add-asset></app-add-asset>

      <br>
      <br>
      <br>

      <app-portfolio-list></app-portfolio-list>

    </div>
  `
})
export class App {
  constructor(private market: MarketService) {}
}