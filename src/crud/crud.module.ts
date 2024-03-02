import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CrudService, PrismaService],
  controllers: [CrudController],
})
export class CrudModule {}
