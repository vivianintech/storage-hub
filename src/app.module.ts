import { Module } from '@nestjs/common';
import { FileHandlerModule } from './file-handler/file-handler.module';

@Module({
  imports: [FileHandlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
