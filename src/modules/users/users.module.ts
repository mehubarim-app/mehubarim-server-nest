import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/entities/user.entity';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/persistence/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    }
  ],
  exports: [UserService]
})
export class UsersModule {}
