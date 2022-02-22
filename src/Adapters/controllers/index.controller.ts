import { Controller, Get } from 'routing-controllers';

@Controller()
export class IndexController {
  @Get('/healthy')
  index() {
    return { status: 'Healthy' };
  }
}
