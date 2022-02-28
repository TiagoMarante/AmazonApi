import { injectable } from 'inversify';
import ISupplierService from '../interfaces/supplier/supplier_serv.interface';
import { SupplierDto } from '../dtos/Applicattion/supplier.dto';
import { createSupplierDto } from '../dtos/Swagger/supplier.dto';

@injectable()
export default class SupplierService implements ISupplierService {
  findSupplierById(id: string): Promise<SupplierDto> {
    throw new Error('Method not implemented.');
  }
  createSupplier(product: createSupplierDto): Promise<SupplierDto> {
    throw new Error('Method not implemented.');
  }
  updateSupplier(id: string, userData: createSupplierDto): Promise<SupplierDto> {
    throw new Error('Method not implemented.');
  }
  deleteSupplier(id: string): Promise<SupplierDto> {
    throw new Error('Method not implemented.');
  }
}
