import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { PaceService } from './pace.service';
import { PaceAverage } from 'src/shared/dtos/pace-average.dto';
import { PaceDto } from 'src/shared/dtos/pace.dto';

@Controller('/pace')
export class PaceController {
  constructor(private readonly paceService: PaceService) {}

  @Get()
  getAll(): Promise<Partial<PaceDto>[]> {
    return this.paceService.getAll();
  }

  @Post()
  create(@Body() pace: PaceDto): Promise<PaceDto> {
    return this.paceService.create(pace);
  }

  @Delete()
  delete(@Query() params: { id: string }): Promise<{ _id: string }> {
    return this.paceService.delete(params.id);
  }

  @Get('/graph')
  getAveragePaceGraph(): Promise<PaceAverage[]> {
    return this.paceService.getAveragePaceGraph();
  }
}
