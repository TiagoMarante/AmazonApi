import { Supplier, SupplierProduct } from '@prisma/client';

export class SupplierProductDto {
  id: string;
  quantity_box: number;
  price_box: number;
  price_unit: number;
  supplierId: string;
  product_WharehouseId: string;
  version: number;

  constructor(supplier: SupplierProduct) {
    this.id = supplier.id;
    this.quantity_box = supplier.quantity_box;
    this.price_box = supplier.price_box;
    this.price_unit = supplier.price_unit;
    this.supplierId = supplier.supplierId;
    this.product_WharehouseId = supplier.product_WharehouseId;
    this.version = supplier.version;
  }
}
