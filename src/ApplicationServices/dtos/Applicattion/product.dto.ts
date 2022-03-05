import { Product_Wharehouse } from '@prisma/client';

export class ProductDto {
  id: string;
  name: string;
  grossweight: number;
  netWeight: number;
  width: number;
  lenght: number;
  hscode: string;
  price_acq: number;
  price_aux: number[];
  ean: string;
  imgId: string;
  version: number;

  constructor(product: Product_Wharehouse) {
    this.id = product.id;
    this.name = product.name;
    this.grossweight = product.grossweight;
    this.netWeight = product.netWeight;
    this.width = product.width;
    this.lenght = product.lenght;
    this.hscode = product.hscode;
    this.price_acq = product.price_acq;
    this.price_aux = product.price_aux;
    this.ean = product.ean;
    this.imgId = product.imgId;
    this.version = product.version;
  }
}
