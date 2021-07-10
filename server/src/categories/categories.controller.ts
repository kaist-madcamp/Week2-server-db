import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { SeeAllCategoriesOutput } from './dtos/see-all-categories.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createCategory(
    @Body() createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }

  @Get('/all')
  async findAllCategories(): Promise<SeeAllCategoriesOutput> {
    return this.categoriesService.findAllCategories();
  }
}
