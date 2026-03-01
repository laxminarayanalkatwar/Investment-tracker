import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioStore } from '../state/portfolio.store';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card">
      <h3>Add Asset</h3>

      <input [(ngModel)]="name" placeholder="Name" />
      <input [(ngModel)]="symbol" placeholder="Symbol" />
      <input [(ngModel)]="quantity" type="number" placeholder="Qty" />
      <input [(ngModel)]="price" type="number" placeholder="Buy Price" />

      <button (click)="add()">Add</button>
    </div>
  `,
  styles: [`
    .card {
      padding: 16px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
    }

    input {
      display: block;
      margin-bottom: 10px;
    }
  `]
})
export class AddAssetComponent {

  name = '';
  symbol = '';
  quantity =0;
  price = 0;

  constructor(private store: PortfolioStore) {}

  add() {
    this.store.addAsset({
      id: uuid(),
      name: this.name,
      symbol: this.symbol,
      quantity: this.quantity,
      buyPrice: this.price,
      currentPrice: this.price
    });

    this.name = '';
    this.symbol = '';
    this.quantity = 0;
    this.price = 0;
  }
}