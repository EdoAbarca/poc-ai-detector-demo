import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';
import { EditResultDto } from './dto/edit-result.dto';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) { }
  
  getResults() {
    return this.prisma.result.findMany({});
  }

  getResultById(resultId: number) {
    return this.prisma.result.findUnique({
      where: {
        id: resultId,
      },
    });
  }

  async createResult(dto: CreateResultDto) {
    const result =
      await this.prisma.result.create({
        data: {
          ...dto,
        },
      });

    return result;
  }

  async editResultById(
    resultId: number,
    dto: EditResultDto,
  ) {
    // get the result by id
    const result =
      await this.prisma.result.findUnique({
        where: {
          id: resultId,
        },
      });

    return this.prisma.result.update({
      where: {
        id: resultId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteResultById(resultId: number) {
    // get the result by id
    const result =
      await this.prisma.result.findUnique({
        where: {
          id: resultId,
        },
      });

    return this.prisma.result.delete({
      where: {
        id: resultId,
      },
    });
  }
}
