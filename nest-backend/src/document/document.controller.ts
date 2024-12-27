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

import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  EditDocumentDto,
} from './dto';

@Controller('document')
export class DocumentController {
  constructor(
    private documentService: DocumentService,
  ) { }

  @Get()
  getDocuments() {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  getDocumentById(
    @Param('id', ParseIntPipe) documentId: number,
  ) {
    return this.documentService.getDocumentById(
      documentId,
    );
  }

  @Post()
  createDocument(
    @Body() dto: CreateDocumentDto,
  ) {
    return this.documentService.createDocument(
      dto,
    );
  }

  @Patch(':id')
  editDocumentById(
    @Param('id', ParseIntPipe) documentId: number,
    @Body() dto: EditDocumentDto,
  ) {
    return this.documentService.editDocumentById(
      documentId,
      dto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteDocumentById(
    @Param('id', ParseIntPipe) documentId: number,
  ) {
    return this.documentService.deleteDocumentById(
      documentId,
    );
  }
}
