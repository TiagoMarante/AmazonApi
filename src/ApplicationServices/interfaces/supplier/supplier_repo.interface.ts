import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import { Supplier } from '@prisma/client';

export default interface ISupplierRepository {
  findSupplierById(id: string): Promise<Supplier>;
  findAllProductSuppliers(productId: string): Promise<Supplier[]>;
  createSupplier(productId: string, supplierData: CreateSupplierDto): Promise<Supplier>;
  updateSupplier(id: string, userData: CreateSupplierDto): Promise<Number>;
  deleteSupplier(id: string): Promise<Supplier>;
}
