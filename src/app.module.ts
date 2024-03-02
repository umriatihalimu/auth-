import { Module } from '@nestjs/common';

import { CrudModule } from './crud/crud.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CrudModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
