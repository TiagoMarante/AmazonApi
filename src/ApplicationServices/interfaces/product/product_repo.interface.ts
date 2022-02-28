import { CreateProductDto } from '@/ApplicationServices/dtos/Swagger/product.dto';
import { Product_Wharehouse } from '@prisma/client';

export default interface IProductRepository {
  findAllProducts(): Promise<Product_Wharehouse[]>;
  findProductById(id: string): Promise<Product_Wharehouse>;
  createProduct(product: CreateProductDto): Promise<Product_Wharehouse>;
  updateProduct(productId: string, userData: CreateProductDto): Promise<Product_Wharehouse>;
  deleteProduct(productId: string): Promise<Product_Wharehouse>;
}
