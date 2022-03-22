import { ProductDto } from '@/ApplicationServices/dtos/Applicattion/product.dto';
import { SupplierDto } from '@/ApplicationServices/dtos/Applicattion/supplier.dto';
import { SupplierProductDto } from '@/ApplicationServices/dtos/Applicattion/supplier_pro.dto';
import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';
import ISupplierProductService from '@/ApplicationServices/interfaces/supplier_product/supplier_pro_serv.interface';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import { Controller, Get, UseBefore, Param, Body, Put, Post, Delete } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';

@Controller()
export class SupplierProductController {
  public supplierProductService = injector.get<ISupplierProductService>(TYPES.ISupplierProductService);

  @Post('/supplier_product')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateSupplierProductDto, 'body', true))
  @OpenAPI({ summary: 'Create supplier product' })
  async postSupplierProduct(@Body() supplierData: CreateSupplierProductDto) {
    const newSupplier: SupplierProductDto = await this.supplierProductService.createSupplierProduct(supplierData);
    return { result: newSupplier, message: 'created' };
  }

  @Get('/supplier_product/:supplierId')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about all products of a supplier' })
  async getAllProductOfSupplier(@Param('supplierId') supplierId: string) {
    const findAllSuppliersProducts: SupplierProductDto[] = await this.supplierProductService.findAllSupplierProducts(supplierId);
    return { result: findAllSuppliersProducts, message: 'findAll' };
  }

  @Get('/supplier_product/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about all suppliers' })
  async getAllFromSuppliers() {
    const findAll: SupplierProductDto[] = await this.supplierProductService.findAllSupplierInfo();
    return { result: findAll, message: 'findAll' };
  }

  // @Get('/supplier/:id')
  // @UseBefore(authMiddleware)
  // @OpenAPI({ summary: 'Return information of a Supplier' })
  // async getSupplierById(@Param('id') id: string) {
  //   const findSupplierById: SupplierDto = await this.supplierProductService.findSupplierById(id);
  //   return { result: findSupplierById, message: 'findOne' };
  // }

  // @Get('/supplier')
  // @UseBefore(authMiddleware)
  // @OpenAPI({ summary: 'Return information of all Suppliers' })
  // async getAllSuppliers() {
  //   const findAllSuppliers: SupplierDto[] = await this.supplierProductService.findAllSuppliers();
  //   return { result: findAllSuppliers, message: 'findOne' };
  // }

  @Put('/supplier_product/:productId')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateSupplierProductDto, 'body', true))
  @OpenAPI({ summary: 'Update Supplier' })
  async addCurrentStock(@Param('productId') productId: string, @Body() supplierData: CreateSupplierProductDto) {
    const updatedSupplier: Number = await this.supplierProductService.updateSupplierProduct(productId, supplierData);
    return { result: updatedSupplier, message: 'Supplier updated' };
  }

  @Delete('/supplier_product/:productId')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete product of a supplier' })
  async deleteProduct(@Param('productId') productId: string) {
    const deleteSupplier = await this.supplierProductService.deleteSupplierProduct(productId);
    return { result: deleteSupplier, message: 'deleted' };
  }
}
