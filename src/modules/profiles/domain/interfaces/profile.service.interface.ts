import { Organization } from '../entities/organization.entity';
import { Consumer } from '../entities/consumer.entity';
import { OrganizationProfileDataDto } from '../dto/organization-profile.dto';
import { ConsumerProfileDataDto } from '../dto/consumer-profile.dto';

export interface ProfileService {
  createProfile(
    profileData: OrganizationProfileDataDto | ConsumerProfileDataDto,
  ): Promise<Organization | Consumer>;
  
  updateProfile(
    id: string,
    profileData: Partial<Organization> | Partial<Consumer>,
  ): Promise<Organization | Consumer>;
  
  getProfile(id: string): Promise<Organization | Consumer>;
  
  deleteProfile(id: string): Promise<boolean>;
}
