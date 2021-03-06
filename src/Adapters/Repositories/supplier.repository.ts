import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import ISupplierRepository from '@/ApplicationServices/interfaces/supplier/supplier_repo.interface';
import prisma from '@/utils/db';
import { Supplier } from '@prisma/client';

import { injectable } from 'inversify';

@injectable()
export default class SupplierRepository implements ISupplierRepository {
  
  async findSupplierById(id: string): Promise<Supplier> {
    /**
     * Find Single Supplier
     */

    const supplier = await prisma.supplier.findUnique({
      where: {
        id: id,
      },
    });

    return supplier;
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    /**
     * Find All Suppliers
     */

    const suppliers = await prisma.supplier.findMany({});

    return suppliers;
  }

  async createSupplier(supplierData: CreateSupplierDto): Promise<Supplier> {
    /**
     * Create Supplier
     */

    const newSupplier = await prisma.supplier.create({
      data: {
        nif: supplierData.nif,
        name: supplierData.name,
        address: supplierData.address,
        email: supplierData.email,
        version: 0,
      },
    });

    return newSupplier;
  }

  async updateSupplier(id: string, supplierData: CreateSupplierDto): Promise<Number> {
    /**
     * Update Supplier
     */

    try {
      const updateSupplier = await prisma.supplier.updateMany({
        where: {
          id: id,
          version: supplierData.version,
        },
        data: {
          nif: supplierData.nif,
          name: supplierData.name,
          address: supplierData.address,
          email: supplierData.email,
          version: {
            increment: 1,
          },
        },
      });

      return updateSupplier.count;
    } catch (error) {
      return null;
    }
  }

  async deleteSupplier(id: string): Promise<Supplier> {
    /**
     * Delete a Supplier
     */

    const deleteSupplier = await prisma.supplier.delete({
      where: {
        id: id,
      },
    });

    return deleteSupplier;
  }
}
