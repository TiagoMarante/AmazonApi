import { createSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';
import { Suplier } from '@prisma/client';

export default interface ISupplierRepository {
  findSupplierById(id: string): Promise<Suplier>;
  createSupplier(product: createSupplierDto): Promise<Suplier>;
  updateSupplier(id: string, userData: createSupplierDto): Promise<Suplier>;
  deleteSupplier(id: string): Promise<Suplier>;
}
