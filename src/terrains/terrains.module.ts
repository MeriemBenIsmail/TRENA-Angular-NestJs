import { Module } from '@nestjs/common';
import { TerrainsService } from './terrains.service';
import { TerrainsController } from './terrains.controller';

@Module({
  controllers: [TerrainsController],
  providers: [TerrainsService]
})
export class TerrainsModule {}
