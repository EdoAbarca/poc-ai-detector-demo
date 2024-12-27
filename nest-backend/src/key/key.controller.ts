import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    //UseGuards,
} from '@nestjs/common';
//import { JwtGuard } from '../auth/guard';
import { KeyService } from './key.service';
import {
    CreateKeyDto,
    EditKeyDto,
} from './dto';

//@UseGuards(JwtGuard)
@Controller('key')
export class KeyController {
    constructor(
        private keyService: KeyService,
    ) { }

    @Get()
    getKeys() {
        return this.keyService.getKeys();
    }

    @Get(':id')
    getKeyById(
        @Param('id', ParseIntPipe) keyId: number,
    ) {
        return this.keyService.getKeyById(
            keyId,
        );
    }

    @Post()
    createKey(
        @Body() dto: CreateKeyDto,
    ) {
        return this.keyService.createKey(
            dto,
        );
    }

    @Patch(':id')
    editKeyById(
        @Param('id', ParseIntPipe) keyId: number,
        @Body() dto: EditKeyDto,
    ) {
        return this.keyService.editKeyById(
            keyId,
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteKeyById(
        @Param('id', ParseIntPipe) keyId: number,
    ) {
        return this.keyService.deleteKeyById(
            keyId,
        );
    }
}
