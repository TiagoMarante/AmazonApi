import { Stock } from '@prisma/client';

export class StockDto {
  id: string;
  productId: string;
  currentStock: number;
  neededStock: number;
  version: number;

  constructor(stock: Stock) {
    this.id = stock.id;
    this.productId = stock.product_WharehouseId;
    this.currentStock = stock.currentStock;
    this.neededStock = stock.neededStock;
    this.version = stock.version;
  }
}
