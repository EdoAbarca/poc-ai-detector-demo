import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateAIDto,
    EditAIDto,
} from './dto';

@Injectable()
export class AiService {
    constructor(private prisma: PrismaService) { }

    getAIs() {
        return this.prisma.aI.findMany({});
    }

    getAIById(aiId: number) {
        return this.prisma.aI.findUnique({
            where: {
                id: aiId,
            },
        });
    }

    async createAI(dto: CreateAIDto) {
        const ai =
            await this.prisma.aI.create({
                data: {
                    ...dto,
                },
            });

        return ai;
    }

    async editAIById(
        aiId: number,
        dto: EditAIDto,
    ) {
        // get the ai by id
        const ai =
            await this.prisma.aI.findUnique({
                where: {
                    id: aiId,
                },
            });

        return this.prisma.aI.update({
            where: {
                id: aiId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteAIById(aiId: number) {
        // get the ai by id
        const ai =
            await this.prisma.aI.findUnique({
                where: {
                    id: aiId,
                },
            });

        return this.prisma.aI.delete({
            where: {
                id: aiId,
            },
        });
    }
}
