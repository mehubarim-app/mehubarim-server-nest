import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/entities/user.entity';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { UserController } from './presentation/controllers/user.controller';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    ProfilesModule,
  ],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    }
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
