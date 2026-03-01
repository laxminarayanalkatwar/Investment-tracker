import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PortfolioStore } from '../state/portfolio.store';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="50"
      style="height:300px">

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Profit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *cdkVirtualFor="let asset of assets()">
            <td>{{asset.name}}</td>
            <td>{{asset.symbol}}</td>
            <td>{{asset.quantity}}</td>
            <td>{{asset.buyPrice}}</td>
            <td>{{asset.currentPrice}}</td>
            <td>{{profit(asset)}}</td>
            <td>
              <button (click)="remove(asset.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    table {
      width: 100%;
    }

    td, th {
      padding: 8px;
    }

    .card {
      border: 1px solid #ccc;
      padding: 16px;
    }
  `]
})
export class PortfolioListComponent {

  assets;

  constructor(private store: PortfolioStore) {
    this.assets = store.assets;
  }

  remove(id: string) {
    this.store.removeAsset(id);
  }

  profit(asset: any) {
    return (
      asset.currentPrice - asset.buyPrice
    ) * asset.quantity;
  }
}