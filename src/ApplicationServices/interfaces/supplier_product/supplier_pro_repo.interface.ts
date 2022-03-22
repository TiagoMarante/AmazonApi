import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';
import { SupplierProduct } from '@prisma/client';

export default interface ISupplierProductRepository {
  findSupplierProductById(id: string): Promise<SupplierProduct>;
  findAllSupplierProducts(): Promise<SupplierProduct[]>;
  createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProduct>;
  updateSupplierProduct(id: string, supplierData: CreateSupplierProductDto): Promise<Number>;
  deleteSupplierProduct(id: string): Promise<SupplierProduct>;
}
