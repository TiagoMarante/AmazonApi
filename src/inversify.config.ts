import { TYPES } from '../types';
import { UserService } from './ApplicationServices/services/users.service';
import { Container } from 'inversify';
import { ProductService } from './ApplicationServices/services/product.service';
import { ProductRepository } from './Adapters/repositories/product.repository';
import { UserRepository } from './Adapters/repositories/users.repository';
import AuthService from './ApplicationServices/services/auth.service';
import IAuthService from './ApplicationServices/interfaces/auth.interface';
import IUserService from './ApplicationServices/interfaces/user/user_serv.interface';
import IUserRepository from './ApplicationServices/interfaces/user/user_repo.interface';
import IProductService from './ApplicationServices/interfaces/product/product_serv.interface';
import IProductRepository from './ApplicationServices/interfaces/product/product_repo.interface';
import IStockService from './ApplicationServices/interfaces/stock/stock_serv.interface';
import { StockService } from './ApplicationServices/services/stock.service';
import IStockRepository from './ApplicationServices/interfaces/stock/stock_repo.interface';
import { StockRepository } from './Adapters/repositories/stock.repository';
import ISupplierService from './ApplicationServices/interfaces/supplier/supplier_serv.interface';
import ISupplierRepository from './ApplicationServices/interfaces/supplier/supplier_repo.interface';
import SupplierRepository from './Adapters/repositories/supplier.repository';
import SupplierService from './ApplicationServices/services/supplier.service';

const injector = new Container();

injector.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

injector.bind<IUserService>(TYPES.IUserService).to(UserService);
injector.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

injector.bind<IProductService>(TYPES.IProductService).to(ProductService);
injector.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);

injector.bind<IStockService>(TYPES.IStockService).to(StockService);
injector.bind<IStockRepository>(TYPES.IStockRepository).to(StockRepository);

injector.bind<ISupplierService>(TYPES.ISupplierService).to(SupplierService);
injector.bind<ISupplierRepository>(TYPES.ISupplierRepository).to(SupplierRepository);

export { injector };
