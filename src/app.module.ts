import { Module } from '@nestjs/common';

import { CrudModule } from './crud/crud.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CrudModule, ConfigModule.forRoot(), AuthModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}

// ConfigModule.forRoot() untuk akses env variabel di semua file
