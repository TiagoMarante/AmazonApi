import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';
import { SupplierProduct } from '@prisma/client';

export default interface ISupplierProductRepository {
  findSupplierProductById(id: string): Promise<SupplierProduct>;
  findAllSupplierProducts(supplierId: string): Promise<SupplierProduct[]>;
  findAllSupplierInfo(): Promise<SupplierProduct[]>;
  createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProduct>;
  updateSupplierProduct(productId: string, supplierData: CreateSupplierProductDto): Promise<Number>;
  deleteSupplierProduct(productId: string): Promise<Number>;
}
