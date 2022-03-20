import { injectable } from 'inversify';
import ISupplierService from '../interfaces/supplier/supplier_serv.interface';
import { SupplierDto } from '../dtos/Applicattion/supplier.dto';
import { injector } from '@/inversify.config';
import ISupplierRepository from '../interfaces/supplier/supplier_repo.interface';
import { HttpException } from '@/exceptions/HttpException';
import { TYPES } from '@/types';
import { Supplier } from '@prisma/client';
import { CreateSupplierDto } from '../dtos/Swagger/supplier.dto';

@injectable()
export class SupplierService implements ISupplierService {
  public supplierRepository = injector.get<ISupplierRepository>(TYPES.ISupplierRepository);

  async findSupplierById(id: string): Promise<SupplierDto> {
    const supplier: Supplier = await this.supplierRepository.findSupplierById(id);

    if (!supplier) throw new HttpException(409, 'No supplier found with this key');
    const findSupplier: SupplierDto = new SupplierDto(supplier);

    return findSupplier;
  }


  async findAllSuppliers(): Promise<SupplierDto[]> {
    const suppliers: Supplier[] = await this.supplierRepository.findAllSuppliers();

    if (!suppliers) throw new HttpException(409, 'No suppliers found');
    const findSupplier: SupplierDto[] = this.listToDto(suppliers);

    return findSupplier;
  }

  // async findAllProductOfSuppliers(productId: string): Promise<SupplierDto[]> {
  //   const suppliers: Supplier[] = await this.supplierRepository.findAllProductSuppliers(productId);
  //   return this.listToDto(suppliers);
  // }

  async createSupplier(supplierData: CreateSupplierDto): Promise<SupplierDto> {
    let newSupplier: SupplierDto;

    try {
      newSupplier = new SupplierDto(await this.supplierRepository.createSupplier(supplierData));
    } catch (error) {
      throw new HttpException(409, 'Error creating new supplier');
    }

    return newSupplier;
  }

  async updateSupplier(id: string, supplierData: CreateSupplierDto): Promise<Number> {
    const findSupplier: SupplierDto = new SupplierDto(await this.supplierRepository.findSupplierById(id));
    if (!findSupplier) throw new HttpException(409, 'No supplier found with this key');

    const updatedSupplier = await this.supplierRepository.updateSupplier(id, supplierData);
    if (updatedSupplier <= 0) throw new HttpException(409, 'Error updating supplier');

    return updatedSupplier;
  }

  async deleteSupplier(id: string): Promise<SupplierDto> {
    const findSupplier: SupplierDto = new SupplierDto(await this.supplierRepository.findSupplierById(id));
    if (!findSupplier) throw new HttpException(409, 'No supplier found with this key');

    const deleteSupplier: SupplierDto = new SupplierDto(await this.supplierRepository.deleteSupplier(id));
    return deleteSupplier;
  }

  private listToDto(list: Supplier[]): SupplierDto[] {
    const supplierList: SupplierDto[] = [];

    list.map(elem => {
      supplierList.push(new SupplierDto(elem));
    });

    return supplierList;
  }
}
