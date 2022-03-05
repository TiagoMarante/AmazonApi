import { SupplierDto } from '@/ApplicationServices/dtos/Applicattion/supplier.dto';
import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';

export default interface ISupplierService {
  findSupplierById(id: string): Promise<SupplierDto>;
  findAllProductSuppliers(productId: string): Promise<SupplierDto[]>;
  createSupplier(productId: string, supplierData: CreateSupplierDto): Promise<SupplierDto>;
  updateSupplier(id: string, userData: CreateSupplierDto): Promise<Number>;
  deleteSupplier(id: string): Promise<SupplierDto>;
}
