import { Organization } from '../entities/organization.entity';
import { OrganizationProfileDataDto } from '../dto/organization-profile.dto';

export interface IOrganizationRepository {
  create(organization: Partial<Organization>): Promise<Organization>;
  findById(id: string): Promise<Organization>;
  findByUserId(userId: string): Promise<Organization>;
  update(id: string, updateData: Partial<Organization>): Promise<Organization>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Organization[]>;
  findByLocation(location: string): Promise<Organization[]>;
}
