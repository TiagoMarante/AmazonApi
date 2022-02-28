import { SupplierDto } from '@/ApplicationServices/dtos/Applicattion/supplier.dto';
import { createSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';

export default interface ISupplierService {
  findSupplierById(id: string): Promise<SupplierDto>;
  createSupplier(product: createSupplierDto): Promise<SupplierDto>;
  updateSupplier(id: string, userData: createSupplierDto): Promise<SupplierDto>;
  deleteSupplier(id: string): Promise<SupplierDto>;
}
