import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirebaseService } from './firebase/firebase.service';
import { TreeModule } from './modules/modules.module';

@Module({
  imports: [AuthModule, TreeModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
