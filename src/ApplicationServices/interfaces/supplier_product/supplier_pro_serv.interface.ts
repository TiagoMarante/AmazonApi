import { ProductDto } from '@/ApplicationServices/dtos/Applicattion/product.dto';
import { SupplierProductDto } from '@/ApplicationServices/dtos/Applicattion/supplier_pro.dto';
import { CreateSupplierProductDto } from '@/ApplicationServices/dtos/Swagger/supplier_pro.dto';

export default interface ISupplierProductService {
  findSupplierProductById(id: string): Promise<SupplierProductDto>;
  findAllSupplierProducts(supplierId: string): Promise<SupplierProductDto[]>;
  findAllSupplierInfo(): Promise<SupplierProductDto[]>;
  createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProductDto>;
  updateSupplierProduct(id: string, supplierData: CreateSupplierProductDto): Promise<Number>;
  deleteSupplierProduct(productId: string): Promise<Number>;
}
