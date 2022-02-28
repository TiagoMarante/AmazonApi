import { TYPES } from '@/../types';
import { HttpException } from '@/exceptions/HttpException';
import { injector } from '@/inversify.config';
import { Stock } from '@prisma/client';
import { injectable } from 'inversify';
import { StockDto } from '../dtos/Applicattion/stock.dto';
import { UpdateStockDto } from '../dtos/Swagger/stock.dto';
import IStockRepository from '../interfaces/stock/stock_repo.interface';
import IStockService from '../interfaces/stock/stock_serv.interface';

@injectable()
export class StockService implements IStockService {
  public stockRepository = injector.get<IStockRepository>(TYPES.IStockRepository);

  async findAllStock(): Promise<StockDto[]> {
    const stocks: Stock[] = await this.stockRepository.findAllStock();
    return this.listToDto(stocks);
  }

  async findStockById(id: string): Promise<StockDto> {
    const stock: Stock = await this.stockRepository.findStockById(id);
    if (!stock) throw new HttpException(409, 'No stock found with this key');

    const findStock: StockDto = new StockDto(stock);

    return findStock;
  }

  async createStock(product: string): Promise<StockDto> {
    let newStock: StockDto;

    try {
      newStock = new StockDto(await this.stockRepository.createStock(product));
    } catch (error) {
      throw new HttpException(409, 'Error creating new product, key not valid');
    }

    return newStock;
  }

  async updateStock(stock: UpdateStockDto): Promise<StockDto> {
    const findStock: Stock = await this.stockRepository.findStockById(stock.id);
    if (!findStock) throw new HttpException(409, 'No stock found with this key');

    let updateStock: StockDto;

    try {
      updateStock = new StockDto(await this.stockRepository.updateStock(stock.id, stock));
    } catch (error) {
      throw new HttpException(409, 'Error updating current product stock');
    }

    return updateStock;
  }

  private listToDto(list: Stock[]): StockDto[] {
    const list2: StockDto[] = [];

    list.map(elem => {
      list2.push(new StockDto(elem));
    });

    return list2;
  }
}
