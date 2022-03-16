import { ImgDto } from '@/ApplicationServices/dtos/Applicattion/img.dto';
import { ImageDto } from '@/ApplicationServices/dtos/Swagger/img.dto';

export default interface IImageService {
  findAllImages(): Promise<ImgDto[]>;
  findImageById(id: string): Promise<ImgDto>;
  updateImages(imgData: ImageDto): Promise<ImgDto>;
}
