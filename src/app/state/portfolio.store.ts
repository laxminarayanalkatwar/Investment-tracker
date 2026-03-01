import { Injectable, signal, computed, effect } from '@angular/core';
import { Asset } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioStore {

  private assetsSignal = signal<Asset[]>(this.loadFromStorage());

  assets = this.assetsSignal.asReadonly();
  priceHistory = signal<number[]>([]);

  totalInvestment = computed(() =>
    this.assets().reduce((sum, asset) =>
      sum + asset.buyPrice * asset.quantity, 0)
  );

  currentValue = computed(() =>
    this.assets().reduce((sum, asset) =>
      sum + asset.currentPrice * asset.quantity, 0)
  );

  profitLoss = computed(() =>
    this.currentValue() - this.totalInvestment()
  );

  constructor() {
    effect(() => {
      localStorage.setItem(
        'portfolio',
        JSON.stringify(this.assets())
      );
    });

    effect(() => {
  const value = this.currentValue();
  this.priceHistory.update(history => [...history.slice(-20), value]);
});
  }

  addAsset(asset: Asset) {
    this.assetsSignal.update(assets => [...assets, asset]);
  }

  removeAsset(id: string) {
    this.assetsSignal.update(assets =>
      assets.filter(a => a.id !== id)
    );
  }

  updatePrices() {
    this.assetsSignal.update(assets =>
      assets.map(asset => ({
        ...asset,
        currentPrice: this.simulatePrice(asset.currentPrice)
      }))
    );
  }

  private simulatePrice(price: number): number {
    const change = (Math.random() - 0.5) * 2;
    return +(price + change).toFixed(2);
  }

  private loadFromStorage(): Asset[] {
    const data = localStorage.getItem('portfolio');
    return data ? JSON.parse(data) : [];
  }

  averageReturn = computed(() => {
  const assets = this.assets();
  if (!assets.length) return 0;

  const totalReturn = assets.reduce((sum, a) => {
    const change =
      (a.currentPrice - a.buyPrice) / a.buyPrice;
    return sum + change;
  }, 0);

  return totalReturn / assets.length;
});

bestPerformer = computed(() => {
  return this.assets().reduce((best, asset) => {
    const profit =
      asset.currentPrice - asset.buyPrice;

    return !best || profit >
      (best.currentPrice - best.buyPrice)
      ? asset
      : best;

  }, null as any);
});
}