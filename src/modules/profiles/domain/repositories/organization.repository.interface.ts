import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

export interface IOrganizationRepository {
  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization>;
  findById(id: string): Promise<Organization>;
  findByUserId(userId: string): Promise<Organization>;
  update(id: string, updateData: Partial<Organization>): Promise<Organization>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Organization[]>;
  findByLocation(location: string): Promise<Organization[]>;
}
