import { ProductFrontDto } from '@/ApplicationServices/dtos/Applicattion/product-front.dto';
import { CreateProductDto } from '@/ApplicationServices/dtos/Swagger/product.dto';
import { ProductDto } from '../../dtos/Applicattion/product.dto';

export default interface IProductService {
  findAllProducts(): Promise<ProductDto[]>;
  findAllProductsFront(): Promise<ProductFrontDto[]>;
  findProductById(id: string): Promise<ProductDto>;
  createProduct(product: CreateProductDto): Promise<ProductDto>;
  updateProduct(id: string, userData: CreateProductDto): Promise<Number>;
  deleteProduct(id: string): Promise<ProductDto>;
}
