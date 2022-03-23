import { TYPES } from '@/types';
import { HttpException } from '@/exceptions/HttpException';
import { injector } from '@/inversify.config';
import { Img, Product_Wharehouse, Stock } from '@prisma/client';
import { injectable } from 'inversify';
import IProductService from '../interfaces/product/product_serv.interface';
import { ProductDto } from '../dtos/Applicattion/product.dto';
import IProductRepository from '../interfaces/product/product_repo.interface';
import { CreateProductDto } from '../dtos/Swagger/product.dto';
import IStockRepository from '../interfaces/stock/stock_repo.interface';
import { ProductFrontDto } from '../dtos/Applicattion/product-front.dto';
import IImageRepository from '../interfaces/img/image_repo.interface';

@injectable()
export class ProductService implements IProductService {
  public productRepository = injector.get<IProductRepository>(TYPES.IProductRepository);
  public stockRepository = injector.get<IStockRepository>(TYPES.IStockRepository);
  public imageRepository = injector.get<IImageRepository>(TYPES.IImageRepository);

  async findAllProducts(): Promise<ProductDto[]> {
    const products: Product_Wharehouse[] = await this.productRepository.findAllProducts();
    return this.listToDto(products);
  }

  async findAllProductsFront(): Promise<ProductFrontDto[]> {
    let wait = true;
    let productFront: ProductFrontDto[] = [];
    const products: Product_Wharehouse[] = await this.productRepository.findAllProducts();
    

    for (let i = 0; i < products.length; i++) {
      const stock: Stock = await this.stockRepository.findStockByProductId(products[i].id);
      
      const images: Img = await this.imageRepository.findImageById(products[i].imgId);
      const product : ProductFrontDto = new ProductFrontDto(products[i].id, products[i].name, images.photos,stock.currentStock, stock.neededStock);
      console.log(product);
      

      productFront.push(product);

      if(i == products.length-1){
        wait = false;
      }
    }

    if(!wait){
      return productFront;
    }
    
  }

  async findProductById(id: string): Promise<ProductDto> {
    const product: Product_Wharehouse = await this.productRepository.findProductById(id);

    if (!product) throw new HttpException(409, 'No product found with this key');
    const findProduct: ProductDto = new ProductDto(product);

    return findProduct;
  }

  async createProduct(product: CreateProductDto): Promise<ProductDto> {
    let newProduct: ProductDto;

    try {
      newProduct = new ProductDto(await this.productRepository.createProduct(product));
    } catch (error) {
      throw new HttpException(409, 'Error creating new product, because of duplicate information');
    }

    try {
      await this.stockRepository.createStock(newProduct.id);
    } catch (error) {
      throw new HttpException(409, 'Error creating stock for a product');
    }

    return newProduct;
  }

  async updateProduct(id: string, productData: CreateProductDto): Promise<Number> {
    const findProduct: ProductDto = await this.productRepository.findProductById(id);
    if (!findProduct) throw new HttpException(409, 'No product found with this key');

    const newProduct = await this.productRepository.updateProduct(id, productData);
    if (newProduct <= 0) throw new HttpException(409, 'Error updating product');

    return newProduct;
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    const findProduct: ProductDto = await this.productRepository.findProductById(id);
    if (!findProduct) throw new HttpException(409, 'No product found with this key');

    const deleteProduct = await this.productRepository.deleteProduct(id);
    return deleteProduct;
  }

  private listToDto(list: Product_Wharehouse[]): ProductDto[] {
    const productsList: ProductDto[] = [];

    list.map(elem => {
      productsList.push(new ProductDto(elem));
    });

    return productsList;
  }
}
