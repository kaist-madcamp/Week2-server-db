import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { SeeAllCategoriesOutput } from './dtos/see-all-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCategories(): Promise<SeeAllCategoriesOutput> {
    try {
      const categories = await this.prismaService.category.findMany();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      const exist = await this.prismaService.category.findUnique({
        where: {
          name: createCategoryInput.categoryName,
        },
      });
      if (exist) {
        return {
          ok: false,
          error: '이미 존재하는 카테고리입니다.',
        };
      }

      await this.prismaService.category.create({
        data: {
          name: createCategoryInput.categoryName,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
}
