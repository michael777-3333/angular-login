import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async updatedProduct(id: number, product: UpdateUserDto) {
    const productFound = await this.productRepository.findOne({
      where: { id },
    });
    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const updateProduct = Object.assign(productFound, product);
    return this.productRepository.save(updateProduct);
  }

  getProducts() {
    try {
      return this.productRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
