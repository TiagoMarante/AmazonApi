import { Product_Wharehouse } from '@prisma/client';

export class ProductFrontDto {
  id: string;
  name: string;
  img: string;
  stock: number;
  needed: number;

  constructor(id: string, name: string, img: string, stock: number, needed: number) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.stock = stock;
    this.needed = needed;
  }
}
