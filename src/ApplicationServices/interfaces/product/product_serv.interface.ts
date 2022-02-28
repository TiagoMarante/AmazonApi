import { CreateProductDto } from '@/ApplicationServices/dtos/Swagger/product.dto';
import { ProductDto } from '../../dtos/Applicattion/product.dto';

export default interface IProductService {
  findAllProducts(): Promise<ProductDto[]>;
  findProductById(id: string): Promise<ProductDto>;
  createProduct(product: CreateProductDto): Promise<ProductDto>;
  updateProduct(id: string, userData: CreateProductDto): Promise<ProductDto>;
  deleteProduct(id: string): Promise<ProductDto>;
}
