import { TYPES } from '@/types';
import { StockDto } from '@/ApplicationServices/dtos/Applicattion/stock.dto';
import { UpdateStockDto } from '@/ApplicationServices/dtos/Swagger/stock.dto';
import IStockService from '@/ApplicationServices/interfaces/stock/stock_serv.interface';
import { injector } from '@/inversify.config';
import { Controller, Get, UseBefore, Param, Body, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';

@Controller()
export class StockController {
  public stockService = injector.get<IStockService>(TYPES.IStockService);

  @Get('/stocks')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return a list of product Stocks' })
  async getStocks() {
    const findAllStocks: StockDto[] = await this.stockService.findAllStock();
    return { result: findAllStocks, message: 'findAll' };
  }

  @Get('/stocks/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a product stock' })
  async getStockById(@Param('id') id: string) {
    const findOneStock: StockDto = await this.stockService.findStockById(id);
    return { result: findOneStock, message: 'findOne' };
  }


  @Get('/stocks/product/:productId')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return stock about a product' })
  async getStockByProductId(@Param('productId') productId: string) {
    const findProductStock: StockDto = await this.stockService.findStockByProductId(productId);
    return { result: findProductStock, message: 'findOne' };
  }

  @Put('/stocks')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(UpdateStockDto, 'body', true))
  @OpenAPI({ summary: 'Add products to stock' })
  async addCurrentStock(@Body() stockData: UpdateStockDto) {
    const updatedStock: Number = await this.stockService.updateStock(stockData);
    return { result: updatedStock, message: 'Stock Updated' };
  }
}
