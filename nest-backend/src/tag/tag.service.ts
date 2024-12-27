import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateTagDto,
    EditTagDto,
} from './dto';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) { }

    getTags() {
        return this.prisma.tag.findMany({});
    }

    getTagById(tagId: number) {
        return this.prisma.tag.findUnique({
            where: {
                id: tagId,
            },
        });
    }

    async createTag(dto: CreateTagDto) {
        const tag =
            await this.prisma.tag.create({
                data: {
                    ...dto,
                },
            });

        return tag;
    }

    async editTagById(
        tagId: number,
        dto: EditTagDto,
    ) {
        // get the tag by id
        const tag =
            await this.prisma.tag.findUnique({
                where: {
                    id: tagId,
                },
            });

        return this.prisma.tag.update({
            where: {
                id: tagId,
            },
            data: {
                ...dto,
            },
        });
    }
    
    async deleteTagById(tagId: number) {
        // get the tag by id
        const tag =
            await this.prisma.tag.findUnique({
                where: {
                    id: tagId,
                },
            });

        return this.prisma.tag.delete({
            where: {
                id: tagId,
            },
        });
    }
}
