import { injectable } from 'inversify';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import ISupplierProductService from '../interfaces/supplier_product/supplier_pro_serv.interface';
import { SupplierProductDto } from '../dtos/Applicattion/supplier_pro.dto';
import { CreateSupplierProductDto } from '../dtos/Swagger/supplier_pro.dto';
import { HttpException } from '@/exceptions/HttpException';
import ISupplierProductRepository from '../interfaces/supplier_product/supplier_pro_repo.interface';

@injectable()
export class SupplierProductService implements ISupplierProductService {
  public supplierProductRepository = injector.get<ISupplierProductRepository>(TYPES.ISupplierProductRepository);

  findSupplierProductById(id: string): Promise<SupplierProductDto> {
    throw new Error('Method not implemented.');
  }
  findAllSupplierProducts(): Promise<SupplierProductDto[]> {
    throw new Error('Method not implemented.');
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
  updateSupplierProduct(id: string, supplierData: CreateSupplierProductDto): Promise<Number> {
    throw new Error('Method not implemented.');
  }
  
  deleteSupplierProduct(id: string): Promise<SupplierProductDto> {
    throw new Error('Method not implemented.');
  }

  
}
