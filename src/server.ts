process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { AuthController } from '@/Adapters/controllers/auth.controller';
import { IndexController } from '@/Adapters/controllers/index.controller';
import { UsersController } from '@/Adapters/controllers/users.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([AuthController, IndexController, UsersController]);
app.listen();
