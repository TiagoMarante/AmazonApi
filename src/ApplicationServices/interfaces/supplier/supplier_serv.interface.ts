import { SupplierDto } from '@/ApplicationServices/dtos/Applicattion/supplier.dto';
import { CreateSupplierDto } from '@/ApplicationServices/dtos/Swagger/supplier.dto';

export default interface ISupplierService {
  findSupplierById(id: string): Promise<SupplierDto>;
  findAllSuppliers(): Promise<SupplierDto[]>;
  //findAllProductOfSuppliers(productId: string): Promise<SupplierDto[]>;
  createSupplier(supplierData: CreateSupplierDto): Promise<SupplierDto>;
  updateSupplier(id: string, userData: CreateSupplierDto): Promise<Number>;
  deleteSupplier(id: string): Promise<SupplierDto>;
}
