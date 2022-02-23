import { TYPES } from "@/../types";
import { HttpException } from "@/exceptions/HttpException";
import { injector } from "@/inversify.config";
import { Product_Wharehouse, User } from "@prisma/client";
import { isEmpty } from "class-validator";
import { injectable } from "inversify";
import { UserDto } from "../dtos/Applicattion/user.dto";
import { CreateUserDto } from "../dtos/Swagger/users.dto";
import IUserRepository from "../interfaces/user/user_repo.interface";
import IUserService from "../interfaces/user/user_serv.interface";
import bcrypt from 'bcrypt';
import IProductService from "../interfaces/product/product_serv.interface";
import { ProductDto } from "../dtos/Applicattion/product.dto";
import IProductRepository from "../interfaces/product/product_repo.interface";
import { CreateProductDto } from "../dtos/Swagger/product.dto";

@injectable()
export class ProductService implements IProductService {
  public productRepository = injector.get<IProductRepository>(TYPES.IProductRepository);

  async findAllProducts(): Promise<ProductDto[]> {
    const products: Product_Wharehouse[] = await this.productRepository.findAllProducts();
    return this.listToDto(products);
  }


  async findProductById(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findProductById(id);
  
    if (!product) throw new HttpException(409, "No product found with this key");
    const findProduct: ProductDto = new ProductDto(product);
    
    return findProduct;
  }


  async createProduct(product: CreateProductDto): Promise<ProductDto> {
    if (isEmpty(product)) throw new HttpException(400, "No product data given");

    const createProduct = new ProductDto(await this.productRepository.createProduct(product));
    return createProduct;

  }



  async updateProduct(id: string, productData: CreateProductDto): Promise<ProductDto> {
    if (isEmpty(productData)) throw new HttpException(400, "No user data given");

    const findProduct: ProductDto = await this.productRepository.findProductById(id);
    if (!findProduct) throw new HttpException(409, "No product found with this key");

    const newProduct = await this.productRepository.updateProduct(id, productData);
    if(!newProduct) throw new HttpException(409, "Error updating product");

    const updateProduct: ProductDto = new ProductDto(newProduct);
    return updateProduct;
  }


  deleteProduct(id: string): Promise<ProductDto> {
    throw new Error("Method not implemented.");
  }

  private listToDto(list: Product_Wharehouse[]): ProductDto[]{
    const userList: ProductDto[] = [];
    
    list.map((elem) => {
      userList.push(new ProductDto(elem))
    });

    return userList;
  }

  
}
