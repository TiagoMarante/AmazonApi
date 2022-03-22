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
  async getStocks(@Body() supplierData: CreateSupplierProductDto) {
    const newSupplier: SupplierProductDto = await this.supplierProductService.createSupplierProduct(supplierData);
    return { result: newSupplier, message: 'created' };
  }

  // @Get('/supplier/product/:productId')
  // @UseBefore(authMiddleware)
  // @OpenAPI({ summary: 'Return information about all suppliers of a product' })
  // async getAllSuppliersOfaProduct(@Param('productId') productId: string) {
  //   const findAllSuppliers: SupplierDto[] = await this.supplierService.findAllProductOfSuppliers(productId);
  //   return { result: findAllSuppliers, message: 'findAll' };
  // }

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

  // @Put('/supplier/:id')
  // @UseBefore(authMiddleware)
  // @UseBefore(validationMiddleware(CreateSupplierDto, 'body', true))
  // @OpenAPI({ summary: 'Update Supplier' })
  // async addCurrentStock(@Param('id') id: string, @Body() supplierData: CreateSupplierDto) {
  //   const updatedSupplier: Number = await this.supplierProductService.updateSupplier(id, supplierData);
  //   return { result: updatedSupplier, message: 'Supplier updated' };
  // }

  // @Delete('/supplier/:id')
  // @UseBefore(authMiddleware)
  // @OpenAPI({ summary: 'Return information about a product' })
  // async deleteProduct(@Param('id') id: string) {
  //   const deleteSupplier: SupplierDto = await this.supplierProductService.deleteSupplier(id);
  //   return { result: deleteSupplier, message: 'deleted' };
  // }
}
