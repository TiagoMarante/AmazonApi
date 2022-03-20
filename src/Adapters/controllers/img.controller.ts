import { Body, Controller, Get, Param, Put, UseBefore } from 'routing-controllers';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import IImageService from '@/ApplicationServices/interfaces/img/image_serv.interface';
import { ImgDto } from '@/ApplicationServices/dtos/Applicattion/img.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ImageDto } from '@/ApplicationServices/dtos/Swagger/img.dto';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { id } from 'inversify';

@Controller()
export class ImgController {
  public imageService = injector.get<IImageService>(TYPES.IImageService);
  

  @Get('/img')
  @UseBefore(authMiddleware)
  async getAllImages() {
    const imgs: ImgDto[] = await this.imageService.findAllImages();
    return { result: imgs, message: 'findAll' };
  }

  @Get('/img:id')
  @UseBefore(authMiddleware)
  async getImagesById(@Param('id') id: string) {
    const imgData: ImgDto = await this.imageService.findImageById(id);
    return { result: imgData, message: 'findById' };
  }


  @Put('/img')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(ImageDto, 'body', true))
  async updateImages(@Body() imgData: ImageDto) {
    const updatedImg: ImgDto = await this.imageService.updateImages(imgData);
    return { result: updatedImg, message: 'updatedImg' };
  }

}
