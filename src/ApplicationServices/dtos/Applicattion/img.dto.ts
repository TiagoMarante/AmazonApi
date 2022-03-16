import { Img, Product_Wharehouse } from '@prisma/client';

export class ImgDto {
  id: string;
  photos: string [];

  constructor(image : Img) {
    this.id = image.id;
    this.photos = image.photos;
  }
}
