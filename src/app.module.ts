import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DbModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
