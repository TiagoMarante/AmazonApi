import { CreateProductDto } from '@/ApplicationServices/dtos/Swagger/product.dto';
import IProductRepository from '@/ApplicationServices/interfaces/product/product_repo.interface';
import prisma from '@/utils/db';
import { Product_Wharehouse } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class ProductRepository implements IProductRepository {
  async findAllProducts(): Promise<Product_Wharehouse[]> {
    /**
     * Find All Products
     */

    const products = await prisma.product_Wharehouse.findMany({});

    return products;
  }

  async findProductById(id: string): Promise<Product_Wharehouse> {
    /**
     * Find Product by Id
     */

    const product = await prisma.product_Wharehouse.findUnique({
      where: {
        id: id,
      },
    });

    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product_Wharehouse> {
    /**
     * Create a Product
     */

    const products = await prisma.product_Wharehouse.create({
      data: {
        name: product.name,
        grossweight: product.grossweight,
        netWeight: product.netWeight,
        width: product.width,
        lenght: product.lenght,
        hscode: product.hscode,
        price_acq: product.price_acq,
        price_aux: product.price_aux,
        ean: product.ean,
        img: {
          create: {
            photos: product.img,
          },
        },
      },
    });

    return products;
  }

  async updateProduct(id: string, product: CreateProductDto): Promise<Product_Wharehouse> {
    /**
     * Update all fields of a Product
     */

    try {
      const updateProduct = await prisma.product_Wharehouse.update({
        where: {
          id: id,
        },
        data: {
          name: product.name,
          grossweight: product.grossweight,
          netWeight: product.netWeight,
          width: product.width,
          lenght: product.lenght,
          hscode: product.hscode,
          price_acq: product.price_acq,
          price_aux: product.price_aux,
          ean: product.ean,
          img: {
            create: {
              photos: product.img,
            },
          },
        },
      });

      return updateProduct;
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(id: string): Promise<Product_Wharehouse> {
    /**
     * Delete a Product
     */

    const deleteProduct = await prisma.product_Wharehouse.delete({
      where: {
        id: id,
      },
    });

    return deleteProduct;
  }
}
