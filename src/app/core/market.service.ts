import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { PortfolioStore } from '../state/portfolio.store';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private store: PortfolioStore) {
    this.startSimulation();
  }

  startSimulation() {
    interval(2000).subscribe(() => {
      this.store.updatePrices();
    });
  }
}