process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { AuthController } from '@/Adapters/controllers/auth.controller';
import { IndexController } from '@/Adapters/controllers/index.controller';
import { UsersController } from '@/Adapters/controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import { ProductController } from './Adapters/controllers/product.controller';
import { StockController } from './Adapters/controllers/stock.controller';

validateEnv();

const app = new App([
    AuthController, IndexController, 
    UsersController, ProductController,
    StockController
]);
app.listen();
