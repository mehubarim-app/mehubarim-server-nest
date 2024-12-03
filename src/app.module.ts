import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // Configuration module setup
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB connection setup
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
          throw new Error(
            'MONGODB_URI is not defined in environment variables',
          );
        }
        return {
          uri,
          // Removed deprecated options: useNewUrlParser and useUnifiedTopology
        };
      },
    }),
    UsersModule,
    ProfilesModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
