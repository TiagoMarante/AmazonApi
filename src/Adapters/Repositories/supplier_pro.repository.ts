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

  async findAllSupplierProducts(supplierId: string): Promise<SupplierProduct[]> {
    /**
     * Get all products of a Supplier
     */

    const productsFromSupplier = await prisma.supplierProduct.findMany({
      where: {
        supplierId: supplierId
      }
    });

    return productsFromSupplier;
  }

  async findAllSupplierInfo(): Promise<SupplierProduct[]> {
    /**
     * Find all of a Supplier
     */

    const productsFromSupplier = await prisma.supplierProduct.findMany({});
    return productsFromSupplier;
  }


  async createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProduct> {
    /**
     * Create product of a Supplier
     */

    const supplierProduct = await prisma.supplierProduct.create({
      data: {
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


  async updateSupplierProduct(productId: string, supplierData: CreateSupplierProductDto): Promise<Number> {
    /**
     * Update product of a Supplier
     */

    try {
      const updatedProduct = await prisma.supplierProduct.updateMany({
        where: {
          product_WharehouseId: productId
        },
        data: {
          quantity_box: supplierData.quantity_box,
          price_box: supplierData.price_box,
          price_unit: supplierData.price_unit,
          version: {
            increment: 1,
          }
        }
      })
      return updatedProduct.count;
    } catch (error) {
      return null;
    }

  }

  async deleteSupplierProduct(productId: string): Promise<Number> {
    /**
     * Delete product of a Supplier
     */
    try {
      const updatedProduct = await prisma.supplierProduct.deleteMany({
        where: {
          product_WharehouseId: productId
        }
      })
      return updatedProduct.count;
    } catch (error) {
      return null;
    }
  }


}
