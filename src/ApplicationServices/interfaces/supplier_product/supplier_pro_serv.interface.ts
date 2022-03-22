import { SupplierProductDto } from '@/ApplicationServices/dtos/Applicattion/supplier_pro.dto';
import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';

export default interface ISupplierProductService {
  findSupplierProductById(id: string): Promise<SupplierProductDto>;
  findAllSupplierProducts(): Promise<SupplierProductDto[]>;
  createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProductDto>;
  updateSupplierProduct(id: string, supplierData: CreateSupplierProductDto): Promise<Number>;
  deleteSupplierProduct(id: string): Promise<SupplierProductDto>;
}
