import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDocumentDto,
  EditDocumentDto,
} from './dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) { }
  
  getDocuments() {
    return this.prisma.document.findMany({});
  }

  getDocumentById(documentId: number) {
    return this.prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });
  }

  async createDocument(dto: CreateDocumentDto) {
    const document =
      await this.prisma.document.create({
        data: {
          ...dto,
        },
      });

    return document;
  }

  async editDocumentById(
    documentId: number,
    dto: EditDocumentDto,
  ) {
    // get the document by id
    const document =
      await this.prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

    return this.prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteDocumentById(documentId: number) {
    // get the document by id
    const document =
      await this.prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

    return this.prisma.document.delete({
      where: {
        id: documentId,
      },
    });
  }


}
