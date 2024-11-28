import { Injectable, signal } from "@angular/core";
import { Part, Stock } from "./2d.model";

@Injectable({
  providedIn: 'root',
})
export class TwoDStore {
  stocks = signal<Stock[]>([]);
  parts = signal<Part[]>([]);

  addStock() {
    this.stocks.set([
      ...this.stocks(),
      {
        id: String(this.stocks().length + 1),
        quantity: 1,
        name: `Container: ${this.stocks().length + 1}`,
        width: 12,
        height: 12,
        active: true,
        priority: 1,
      },
    ]);
  }

  updateStock(stock: Stock) {
    const stocks = this.stocks();
    const idx = stocks.findIndex((_stock) => _stock.id === stock.id);
    this.stocks.set([...stocks.slice(0, idx), stock, ...stocks.slice(idx + 1)]);
  }

  addPart() {
    this.parts.set([
      ...this.parts(),
      {
        id: String(this.parts().length + 1),
        quantity: 1,
        name: `Part: ${this.parts().length + 1}`,
        width: 12,
        height: 12,
      },
    ]);
  }

  updatePart(part: Part) {
    const parts = this.parts();
    const idx = parts.findIndex((_part) => _part.id === part.id);
    this.parts.set([...parts.slice(0, idx), part, ...parts.slice(idx + 1)]);
  }

  generateStocks(numberOfStock: number): void {
    const stocks = [];
    for (let i = 0; i < numberOfStock; i++) {
      const id = `Container ${i + 1}`;
      const width = Math.floor(Math.random() * 100) + 50; // Random width between 50 and 150
      const height = Math.floor(Math.random() * 100) + 50; // Random height between 50 and 150
      const quantity = Math.floor(Math.random() * 3) + 1; // Random quantity between 1 and 3
      stocks.push({
        id,
        name: id,
        width,
        height,
        quantity,
        priority: 1,
        active: true
      });
    }
    this.stocks.set([
      ...this.stocks(),
      ...stocks
    ])
  }

  generateParts(numberOfPart: number): void {
    const parts: Part[] = [];
    for (let i = 0; i < numberOfPart; i++) {
      const id = `Banner ${i + 1}`;
      const width = Math.floor(Math.random() * 40) + 10; // Random width between 10 and 50
      const height = Math.floor(Math.random() * 40) + 10; // Random height between 10 and 50
      parts.push({ id, name: id, width, height, quantity: 1 });
    }

    this.parts.set([
      ...this.parts(),
      ...parts
    ]);
  }
}