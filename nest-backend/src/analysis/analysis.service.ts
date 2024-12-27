import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAnalysisDto,
  EditAnalysisDto,
} from './dto';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) { }

  getAnalyses() {
    return this.prisma.analysis.findMany({});
  }

  getAnalysisById(analysisId: number) {
    return this.prisma.analysis.findUnique({
      where: {
        id: analysisId,
      },
    });
  }

  async createAnalysis(dto: CreateAnalysisDto) {
    const analysis =
      await this.prisma.analysis.create({
        data: {
          ...dto,
        },
      });

    return analysis;
  }

  async editAnalysisById(
    analysisId: number,
    dto: EditAnalysisDto,
  ) {
    // get the analysis by id
    const analysis =
      await this.prisma.analysis.findUnique({
        where: {
          id: analysisId,
        },
      });

    return this.prisma.analysis.update({
      where: {
        id: analysisId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAnalysisById(analysisId: number) {
    // get the analysis by id
    const analysis =
      await this.prisma.analysis.findUnique({
        where: {
          id: analysisId,
        },
      });

    return this.prisma.analysis.delete({
      where: {
        id: analysisId,
      },
    });
  }
}
