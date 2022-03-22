import { injectable } from 'inversify';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import ISupplierProductService from '../interfaces/supplier_product/supplier_pro_serv.interface';
import { SupplierProductDto } from '../dtos/Applicattion/supplier_pro.dto';
import { CreateSupplierProductDto } from '../dtos/Swagger/supplier_pro.dto';
import { HttpException } from '@/exceptions/HttpException';
import ISupplierProductRepository from '../interfaces/supplier_product/supplier_pro_repo.interface';
import { ProductDto } from '../dtos/Applicattion/product.dto';

@injectable()
export class SupplierProductService implements ISupplierProductService {
  public supplierProductRepository = injector.get<ISupplierProductRepository>(TYPES.ISupplierProductRepository);

  findSupplierProductById(id: string): Promise<SupplierProductDto> {
    throw new Error('Method not implemented.');
  }

  async findAllSupplierProducts(supplierId: string): Promise<SupplierProductDto[]> {
    let suppliersProducts: SupplierProductDto[];

    try {
      suppliersProducts = await this.supplierProductRepository.findAllSupplierProducts(supplierId);
    } catch (error) {
      throw new HttpException(409, 'Error getting data of a supplier');
    }

    return suppliersProducts;
  }

  async findAllSupplierInfo(): Promise<SupplierProductDto[]> {
    let suppliersProducts: SupplierProductDto[];

    try {
      suppliersProducts = await this.supplierProductRepository.findAllSupplierInfo();
    } catch (error) {
      throw new HttpException(409, 'Error finding all');
    }

    return suppliersProducts;
  }

  async createSupplierProduct(supplierData: CreateSupplierProductDto): Promise<SupplierProductDto> {
    let newSupplierProduct: SupplierProductDto;
    

    try {
      newSupplierProduct = new SupplierProductDto(await this.supplierProductRepository.createSupplierProduct(supplierData));
    } catch (error) {
      throw new HttpException(409, 'Error creating new product of a supplier');
    }

    return newSupplierProduct;
  }

  async updateSupplierProduct(productId: string, supplierData: CreateSupplierProductDto): Promise<Number> {
    const newSupplierProduct = await this.supplierProductRepository.updateSupplierProduct(productId, supplierData);
    if (newSupplierProduct <= 0) throw new HttpException(409, 'Error while updating product of a supplier');
    

    return newSupplierProduct;
  }
  
  async deleteSupplierProduct(productId: string): Promise<Number> {
    const deleteSupplier = await this.supplierProductRepository.deleteSupplierProduct(productId);
    if (deleteSupplier <= 0) throw new HttpException(409, 'Error while deleting product of a supplier');
    
    return deleteSupplier;
  }

  
}
