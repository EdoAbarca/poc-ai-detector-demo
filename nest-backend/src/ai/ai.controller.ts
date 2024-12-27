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
import { AiService } from './ai.service';
import {
    CreateAIDto,
    EditAIDto,
} from './dto';

//@UseGuards(JwtGuard)
@Controller('ai')
export class AiController {
    constructor(
        private aiService: AiService,
    ) { }

    @Get()
    getAIs() {
        return this.aiService.getAIs();
    }

    @Get(':id')
    getAIById(
        @Param('id', ParseIntPipe) aiId: number,
    ) {
        return this.aiService.getAIById(
            aiId,
        );
    }

    @Post()
    createAI(
        @Body() dto: CreateAIDto,
    ) {
        return this.aiService.createAI(
            dto,
        );
    }

    @Patch(':id')
    editAIById(
        @Param('id', ParseIntPipe) aiId: number,
        @Body() dto: EditAIDto,
    ) {
        return this.aiService.editAIById(
            aiId,
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAIById(
        @Param('id', ParseIntPipe) aiId: number,
    ) {
        return this.aiService.deleteAIById(
            aiId,
        );
    }
}
