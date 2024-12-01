import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Consumer, ConsumerSchema } from './domain/entities/consumer.entity';
import { Organization, OrganizationSchema } from './domain/entities/organization.entity';
import { ConsumerRepository } from './infrastructure/repositories/consumer.repository';
import { OrganizationRepository } from './infrastructure/repositories/organization.repository';
import { ConsumerService } from './application/services/consumer.service';
import { OrganizationService } from './application/services/organization.service';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { ConsumerController } from './presentation/controllers/consumer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consumer.name, schema: ConsumerSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController, ConsumerController],
  providers: [
    ConsumerService,
    OrganizationService,
    {
      provide: 'IConsumerRepository',
      useClass: ConsumerRepository,
    },
    {
      provide: 'IOrganizationRepository',
      useClass: OrganizationRepository,
    },
  ],
  exports: [ConsumerService, OrganizationService],
})
export class ProfilesModule {}
