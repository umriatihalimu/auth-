import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CrudService {
  constructor(private readonly prisma: PrismaService) {}

  async getKopi() {
    return this.prisma.kopi_crud.findMany();
  }

  getId(): string {
    const id = uuidv4();
    const shortId = id.substring(0, 10);
    return shortId;
  }

  async createKopi(data: any): Promise<boolean> {
    try {
      await this.prisma.kopi_crud.create({
        data: {
          id_kopi: this.getId(),
          produk_kopi: data.produk_kopi,
          harga_kopi: Number(data.harga_kopi),
        },
      });
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  // async updateKopi(id_kopi: string, data: any): Promise<boolean> {
  //   try {
  //     await this.prisma.kopi_crud.update({
  //       where: { id_kopi },
  //       data: {
  //         produk_kopi: data.produk_kopi,
  //         harga_kopi: data.harga_kopi,
  //       },
  //     });
  //     console.log(data);

  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }

  async updateKopi(id: string, { produk_kopi, harga_kopi }): Promise<boolean> {
    try {
      await this.prisma.kopi_crud.update({
        where: { id_kopi: id },
        data: {
          produk_kopi,
          harga_kopi,
        },
      });
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async deleteKopi(id: string): Promise<boolean> {
    try {
      await this.prisma.kopi_crud.delete({
        where: { id_kopi: id },
      });
      return true;
    } catch (error) {
      console.error('Error', error);
      return false;
    }
  }
}
