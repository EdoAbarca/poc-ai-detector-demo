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
import { TagService } from './tag.service';


import {
    CreateTagDto,
    EditTagDto,
} from './dto';

@Controller('tag')
export class TagController {
    constructor(
        private tagService: TagService,
    ) { }

    @Get()
    getTags() {
        return this.tagService.getTags();
    }

    @Get(':id')
    getTagById(
        @Param('id', ParseIntPipe) tagId: number,
    ) {
        return this.tagService.getTagById(
            tagId,
        );
    }

    @Post()
    createTag(
        @Body() dto: CreateTagDto,
    ) {
        return this.tagService.createTag(
            dto,
        );
    }

    @Patch(':id')
    editTagById(
        @Param('id', ParseIntPipe) tagId: number,
        @Body() dto: EditTagDto,
    ) {
        return this.tagService.editTagById(
            tagId,
            dto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTagById(
        @Param('id', ParseIntPipe) tagId: number,
    ) {
        return this.tagService.deleteTagById(
            tagId,
        );
    }
    
}
