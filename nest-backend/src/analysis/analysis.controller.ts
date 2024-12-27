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
import { AnalysisService } from './analysis.service';
import {
    CreateAnalysisDto,
    EditAnalysisDto,
} from './dto';

//@UseGuards(JwtGuard)
@Controller('analysis')
export class AnalysisController {
    constructor(
        private analysisService: AnalysisService
        ) { }

    @Get()
    getAnalyses() {
        return this.analysisService.getAnalyses();
    }

    @Get(':id')
    getAnalysisById(
        @Param('id', ParseIntPipe) analysisId: number,
    ) {
        return this.analysisService.getAnalysisById(
            analysisId,
        );
    }

    @Post()
    createAnalysis(
        @Body() dto: CreateAnalysisDto,
    ) {
        return this.analysisService.createAnalysis(
            dto,
        );
    }

    @Patch(':id')
    editAnalysisById(
        @Param('id', ParseIntPipe) analysisId: number,
        @Body() dto: EditAnalysisDto,
    ) {
        return this.analysisService.editAnalysisById(
            analysisId,
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAnalysisById(
        @Param('id', ParseIntPipe) analysisId: number,
    ) {
        return this.analysisService.deleteAnalysisById(
            analysisId,
        );
    }
}
