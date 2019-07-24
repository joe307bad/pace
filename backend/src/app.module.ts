import { Module } from '@nestjs/common';
import { PaceController } from './pace/pace.controller';
import { PaceService } from './pace/pace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaceSchema } from './shared/schemas/pace.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pace'),
    MongooseModule.forFeature([{ name: 'Pace', schema: PaceSchema }])
  ],
  controllers: [PaceController],
  providers: [PaceService],
})
export class AppModule {}
