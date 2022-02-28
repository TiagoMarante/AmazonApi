import { Suplier } from '@prisma/client';

export class SupplierDto {
  id: string;
  nif: string;
  name: string;
  address: string;
  email: string;
  quantity_box: number;
  price_box: number;
  price_unit: number;

  constructor(supplier: Suplier) {
    this.id = supplier.id;
    this.nif = supplier.nif;
    this.name = supplier.name;
    this.address = supplier.address;
    this.quantity_box = supplier.quantity_box;
    this.price_box = supplier.price_box;
    this.price_unit = supplier.price_unit;
  }
}
