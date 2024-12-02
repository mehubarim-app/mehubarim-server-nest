import { Injectable, Inject } from '@nestjs/common';
import { ProfileService } from '../../domain/interfaces/profile.service.interface';
import { ConsumerService } from '../services/consumer.service';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class ProfileFactory {
  constructor(
    @Inject(ConsumerService) private readonly consumerService: ConsumerService,
    @Inject(OrganizationService) private readonly organizationService: OrganizationService,
  ) {}

  getProfileService(profileType: string): ProfileService {
    switch (profileType) {
      case 'consumer':
        return this.consumerService;
      case 'organization':
        return this.organizationService;
      default:
        throw new Error('Invalid profile type');
    }
  }
}
