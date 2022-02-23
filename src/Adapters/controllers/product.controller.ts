import { TYPES } from "@/../types";
import { ProductDto } from "@/ApplicationServices/dtos/Applicattion/product.dto";
import { CreateProductDto } from "@/ApplicationServices/dtos/Swagger/product.dto";
import { CreateUserDto } from "@/ApplicationServices/dtos/Swagger/users.dto";
import IProductService from "@/ApplicationServices/interfaces/product/product_serv.interface";
import { injector } from "@/inversify.config";
import { Controller, Get, UseBefore, Param, Post, HttpCode, Body, Put, CookieParam, Delete } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";

@Controller()
export class ProductController {
  public productService = injector.get<IProductService>(TYPES.IProductService);

  @Get('/products')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return a list of Products' })
  async getProducts() {
    const findAllProducts: ProductDto[] = await this.productService.findAllProducts();
    return { data: findAllProducts, message: 'findAll' };
  }

  @Get('/products/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a product' })
  async getProductById(@Param('id') id: string) {
    const findOneUserData: ProductDto = await this.productService.findProductById(id);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/products')
  @UseBefore(authMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateProductDto, 'body'))
  @OpenAPI({ summary: 'Create a new product' })
  async createUser(@Body() productData: CreateProductDto) {
    const createProductData: ProductDto = await this.productService.createProduct(productData);
    return { data: createProductData, message: 'created' };
  }

  @Put('/products/:id')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateProductDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@Param('id') id: string, @Body() productData: CreateProductDto) {
    const updateProduct: ProductDto = await this.productService.updateProduct(id, productData);
    return { data: updateProduct, message: 'updated' };
    
    
  }

  @Delete('/product/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@CookieParam("Authorization") res: string) {
    // const userId = tokenToId(res);

    // const deleteUserData: UserDto = await this.userService.deleteUser(userId);
    // return { data: deleteUserData, message: 'deleted' };
  }
}


