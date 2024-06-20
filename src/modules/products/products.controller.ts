import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private _productService: ProductsService) {}

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    return this._productService.createProduct(newProduct);
  }

  @Get()
  getProducts(): Promise<Product[]> {
    return this._productService.getProducts();
  }
  //   @Get(':id')
  //   getProduct(@Param('id') id: number) {
  //     return this._productService.getProduct(id);
  //   }
  //   @Delete(':id')
  //   deleteProduct(@Param('id') id: number) {
  //     return this._productService.deleteProduct(id);
  //   }
  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() Product: UpdateProductDto) {
    return this._productService.updatedProduct(id, Product);
  }
}
