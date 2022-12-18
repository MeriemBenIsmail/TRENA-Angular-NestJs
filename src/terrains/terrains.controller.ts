import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TerrainsService } from './terrains.service';
import { CreateTerrainDto } from './dto/create-terrain.dto';
import { UpdateTerrainDto } from './dto/update-terrain.dto';

@Controller('terrains')
export class TerrainsController {
  constructor(private readonly terrainsService: TerrainsService) {}

  @Post()
  create(@Body() createTerrainDto: CreateTerrainDto) {
    return this.terrainsService.create(createTerrainDto);
  }

  @Get()
  findAll() {
    return this.terrainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terrainsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerrainDto: UpdateTerrainDto) {
    return this.terrainsService.update(+id, updateTerrainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terrainsService.remove(+id);
  }
}
