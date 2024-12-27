import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async changePassword(id: number, password: string) {
        const hash = await argon.hash(password);
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: password,
            },
        });
    }


}
