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
import { ResultService } from './result.service';
import { CreateResultDto, EditResultDto } from './dto';

//@UseGuards(JwtGuard)
@Controller('result')
export class ResultController {
    constructor(
        private resultService: ResultService
    ) { }

    @Get()
    getResults() {
        return this.resultService.getResults();
    }

    @Get(':id')
    getResultById(
        @Param('id', ParseIntPipe) resultId: number,
    ) {
        return this.resultService.getResultById(
            resultId,
        );
    }

    @Post()
    createResult(
        @Body() dto: CreateResultDto,
    ) {
        return this.resultService.createResult(
            dto,
        );
    }

    @Patch(':id')
    editResultById(
        @Param('id', ParseIntPipe) resultId: number,
        @Body() dto: EditResultDto,
    ) {
        return this.resultService.editResultById(
            resultId,
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteResultById(
        @Param('id', ParseIntPipe) resultId: number,
    ) {
        return this.resultService.deleteResultById(
            resultId,
        );
    }
}
