import { Controller, Get } from 'routing-controllers';

@Controller()
export class IndexController {
  @Get('/healy')
  index() {
    return 'Healthy';
  }
}
