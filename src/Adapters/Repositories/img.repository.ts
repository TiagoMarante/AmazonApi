import { ImageDto } from '@/ApplicationServices/dtos/Swagger/img.dto';
import IImageRepository from '@/ApplicationServices/interfaces/img/image_repo.interface';
import prisma from '@/utils/db';
import { Img } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class ImageRepository implements IImageRepository {

  async findAllImages(): Promise<Img[]> {
    /**
     * Find All Images
     */

     const images = await prisma.img.findMany({});

     return images;
  }


  async findImageById(id: string): Promise<Img> {
    /**
     * Find Images by Id
     */

     const images = await prisma.img.findUnique({
      where: {
        id: id,
      },
    });

     return images;
  }


  async updateImages(imgData: ImageDto): Promise<Img> {
    /**
     * Update current Image
     */
     try {
      const updatedImg = await prisma.img.update({
        where: {
          id: imgData.id,
        },
        data: {
          photos: imgData.photos
        },
      });

      return updatedImg;
    } catch (error) {
      return null;
    }
  }
}
