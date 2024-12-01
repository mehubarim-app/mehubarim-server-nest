import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Organization } from '../../domain/entities/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { CreateOrganizationDto } from '../../domain/dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationRepository.create(createOrganizationDto);
  }

  async getOrganizationById(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async getOrganizationByUserId(userId: string): Promise<Organization> {
    const organization = await this.organizationRepository.findByUserId(userId);
    if (!organization) {
      throw new NotFoundException(`Organization with user ID ${userId} not found`);
    }
    return organization;
  }

  async updateOrganization(id: string, updateData: Partial<Organization>): Promise<Organization> {
    const updatedOrganization = await this.organizationRepository.update(id, updateData);
    if (!updatedOrganization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return updatedOrganization;
  }

  async deleteOrganization(id: string): Promise<boolean> {
    const deleted = await this.organizationRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return true;
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async getOrganizationsByLocation(location: string): Promise<Organization[]> {
    return this.organizationRepository.findByLocation(location);
  }
}
