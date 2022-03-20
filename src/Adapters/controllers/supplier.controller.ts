import { SupplierDto } from '@/ApplicationServices/dtos/Applicattion/supplier.dto';
import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import ISupplierService from '@/ApplicationServices/interfaces/supplier/supplier_serv.interface';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import { Controller, Get, UseBefore, Param, Body, Put, Post, Delete } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';

@Controller()
export class SupplierController {
  public supplierService = injector.get<ISupplierService>(TYPES.ISupplierService);

  @Post('/supplier')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateSupplierDto, 'body', true))
  @OpenAPI({ summary: 'Create supplier' })
  async getStocks(@Body() supplierData: CreateSupplierDto) {
    const newSupplier: SupplierDto = await this.supplierService.createSupplier(supplierData);
    return { result: newSupplier, message: 'created' };
  }

  // @Get('/supplier/product/:productId')
  // @UseBefore(authMiddleware)
  // @OpenAPI({ summary: 'Return information about all suppliers of a product' })
  // async getAllSuppliersOfaProduct(@Param('productId') productId: string) {
  //   const findAllSuppliers: SupplierDto[] = await this.supplierService.findAllProductOfSuppliers(productId);
  //   return { result: findAllSuppliers, message: 'findAll' };
  // }

  @Get('/supplier/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information of a Supplier' })
  async getSupplierById(@Param('id') id: string) {
    const findSupplierById: SupplierDto = await this.supplierService.findSupplierById(id);
    return { result: findSupplierById, message: 'findOne' };
  }

  @Get('/supplier')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information of all Suppliers' })
  async getAllSuppliers() {
    const findAllSuppliers: SupplierDto[] = await this.supplierService.findAllSuppliers();
    return { result: findAllSuppliers, message: 'findOne' };
  }

  @Put('/supplier/:id')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateSupplierDto, 'body', true))
  @OpenAPI({ summary: 'Update Supplier' })
  async addCurrentStock(@Param('id') id: string, @Body() supplierData: CreateSupplierDto) {
    const updatedSupplier: Number = await this.supplierService.updateSupplier(id, supplierData);
    return { result: updatedSupplier, message: 'Supplier updated' };
  }

  @Delete('/supplier/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a product' })
  async deleteProduct(@Param('id') id: string) {
    const deleteSupplier: SupplierDto = await this.supplierService.deleteSupplier(id);
    return { result: deleteSupplier, message: 'deleted' };
  }
}
