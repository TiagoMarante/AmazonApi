import { Supplier } from '@prisma/client';

export class SupplierDto {
  id: string;
  nif: string;
  name: string;
  address: string;
  email: string;
  version: number;

  constructor(supplier: Supplier) {
    this.id = supplier.id;
    this.nif = supplier.nif;
    this.name = supplier.name;
    this.address = supplier.address;
    this.email = supplier.email;
    this.version = supplier.version;
  }
}
