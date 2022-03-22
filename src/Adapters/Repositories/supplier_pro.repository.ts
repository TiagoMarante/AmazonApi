import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';
import ISupplierProductRepository from '@/ApplicationServices/interfaces/supplier_product/supplier_pro_repo.interface';
import prisma from '@/utils/db';
import { Supplier, SupplierProduct } from '@prisma/client';

import { injectable } from 'inversify';

@injectable()
export default class SupplierProductRepository implements ISupplierProductRepository {

  
  findSupplierProductById(id: string): Promise<SupplierProduct> {
    throw new Error('Method not implemented.');
  }
  findAllSupplierProducts(): Promise<SupplierProduct[]> {
    throw new Error('Method not implemented.');
  }

  async createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProduct> {
    /**
     * Create product of a Supplier
     */

    const supplierProduct = await prisma.supplierProduct.create({
      data:{
        quantity_box: supplierData.quantity_box,
        price_box: supplierData.price_box,
        price_unit: supplierData.price_unit,
        supplierId: supplierData.supplierId,
        product_WharehouseId: supplierData.product_WharehouseId,
        version: 0
      },
    });

    return supplierProduct;
  }
  updateSupplierProduct(id: string, supplierData: CreateSupplierProductDto): Promise<Number> {
    throw new Error('Method not implemented.');
  }

  deleteSupplierProduct(id: string): Promise<SupplierProduct> {
    throw new Error('Method not implemented.');
  }
  
  
}
