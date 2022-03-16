import { injectable } from 'inversify';
import ISupplierService from '../interfaces/supplier/supplier_serv.interface';
import { SupplierDto } from '../dtos/Applicattion/supplier.dto';
import { injector } from '@/inversify.config';
import ISupplierRepository from '../interfaces/supplier/supplier_repo.interface';
import { HttpException } from '@/exceptions/HttpException';
import { TYPES } from '@/types';
import { Img, Supplier } from '@prisma/client';
import { CreateSupplierDto } from '../dtos/Swagger/supplier.dto';
import IImageService from '../interfaces/img/image_serv.interface';
import IImageRepository from '../interfaces/img/image_repo.interface';
import { ImgDto } from '../dtos/Applicattion/img.dto';
import { ImageDto } from '../dtos/Swagger/img.dto';

@injectable()
export class ImageService implements IImageService {
  public imageRepository = injector.get<IImageRepository>(TYPES.IImageRepository);

  
  async findAllImages(): Promise<ImgDto[]> {
    const imgs: Img[] = await this.imageRepository.findAllImages();

    if (!imgs) throw new HttpException(409, 'No images found');
    const findAllImg: ImgDto[] = imgs;

    return findAllImg;

  }
  
  async findImageById(id: string): Promise<ImgDto> {
    const img: Img = await this.imageRepository.findImageById(id);

    if (!img) throw new HttpException(409, 'No image found');
    const findImg: ImgDto = img;

    return findImg;
  }


  async updateImages(imgData: ImageDto): Promise<ImgDto> {
    const updateImg = await this.imageRepository.updateImages(imgData);
    if (!updateImg) throw new HttpException(409, 'Error while updating');

    const updatedImg : ImgDto = updateImg;

    return updatedImg;
  }
  
  
}
