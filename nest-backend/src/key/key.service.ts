import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateKeyDto,
    EditKeyDto,
} from './dto';

@Injectable()
export class KeyService {
    constructor(private prisma: PrismaService) { }

    getKeys() {
        return this.prisma.key.findMany({});
    }

    getKeyById(keyId: number) {
        return this.prisma.key.findUnique({
            where: {
                id: keyId,
            },
        });
    }

    async createKey(dto: CreateKeyDto) {
        const key =
            await this.prisma.key.create({
                data: {
                    ...dto,
                },
            });

        return key;
    }

    async editKeyById(
        keyId: number,
        dto: EditKeyDto,
    ) {
        // get the key by id
        const key =
            await this.prisma.key.findUnique({
                where: {
                    id: keyId,
                },
            });

        return this.prisma.key.update({
            where: {
                id: keyId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteKeyById(keyId: number) {
        // get the key by id
        const key =
            await this.prisma.key.findUnique({
                where: {
                    id: keyId,
                },
            });

        return this.prisma.key.delete({
            where: {
                id: keyId,
            },
        });
    }
}
