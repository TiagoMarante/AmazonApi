import { ImageDto } from '@/ApplicationServices/dtos/Swagger/img.dto';
import { CreateProductDto } from '@/ApplicationServices/dtos/Swagger/product.dto';
import { Img, Product_Wharehouse } from '@prisma/client';

export default interface IImageRepository {
  findAllImages(): Promise<Img[]>;
  findImageById(id: string): Promise<Img>;
  updateImages(imgData: ImageDto): Promise<Img>;
}
