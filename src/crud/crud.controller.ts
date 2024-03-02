import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import StandarResponse from './standar.response';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  async getKopi() {
    return this.crudService.getKopi();
  }

  // const result = this.crudService.getKopi();
  //   console.log(result instanceof Promise);

  @Post('create')
  async createKopi(@Body() data: any): Promise<StandarResponse> {
    const createDataKopi: boolean = await this.crudService.createKopi(data);
    return {
      status: createDataKopi ? 'berhasil ' : 'gagal',
      message: createDataKopi
        ? 'data kopi berhasil dibuat'
        : 'data kopi gagal dibuat',
    };
  }

  @Patch(':id')
  async updateKopi(
    @Param('id') id: string,
    @Body() data,
  ): Promise<StandarResponse> {
    const updateDataKopi: boolean = await this.crudService.updateKopi(id, data);
    return {
      status: updateDataKopi ? 'berhasil ' : 'gagal',
      message: updateDataKopi
        ? 'data kopi berhasil diubah'
        : 'data kopi gagal diubah',
    };
  }

  @Delete(':id')
  async deleteKopi(@Param('id') id: string): Promise<StandarResponse> {
    const deleteProduk: boolean = await this.crudService.deleteKopi(id);
    return {
      status: deleteProduk ? 'berhasil ' : 'gagal',
      message: deleteProduk
        ? 'data kopi berhasil dihapus'
        : 'data kopi gagal dihapus',
    };
  }
}
