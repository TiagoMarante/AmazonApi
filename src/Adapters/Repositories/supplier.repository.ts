import { createSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import ISupplierRepository from '@/ApplicationServices/interfaces/supplier/supplier_repo.interface';
import { Suplier } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export default class SupplierRepository implements ISupplierRepository {
  findSupplierById(id: string): Promise<Suplier> {
    throw new Error('Method not implemented.');
  }
  createSupplier(product: createSupplierDto): Promise<Suplier> {
    throw new Error('Method not implemented.');
  }
  updateSupplier(id: string, userData: createSupplierDto): Promise<Suplier> {
    throw new Error('Method not implemented.');
  }
  deleteSupplier(id: string): Promise<Suplier> {
    throw new Error('Method not implemented.');
  }
}
