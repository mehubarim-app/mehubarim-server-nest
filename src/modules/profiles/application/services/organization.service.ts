import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Organization } from '../../domain/entities/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationProfileDataDto } from '../../domain/dto/organization-profile.dto';
import { ProfileService } from '../../domain/interfaces/profile.service.interface';
import { OperatingHours } from '../../domain/entities/operating-hours.entity';
import { TimeRange } from '../../domain/entities/time-range.entity';
import { Address } from '../../domain/entities/address.entity';

@Injectable()
export class OrganizationService implements ProfileService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  private convertOperatingHours(dto: OrganizationProfileDataDto): OperatingHours[] {
    const daysMap = {
      sunday: { dayNumber: 1, dayOfWeek: 'ראשון' },
      monday: { dayNumber: 2, dayOfWeek: 'שני' },
      tuesday: { dayNumber: 3, dayOfWeek: 'שלישי' },
      wednesday: { dayNumber: 4, dayOfWeek: 'רביעי' },
      thursday: { dayNumber: 5, dayOfWeek: 'חמישי' },
      friday: { dayNumber: 6, dayOfWeek: 'שישי' },
      saturday: { dayNumber: 7, dayOfWeek: 'שבת' }
    };

    const operatingHours: OperatingHours[] = [];
    
    if (dto.operatingHours) {
      for (const [day, hours] of Object.entries(dto.operatingHours)) {
        if (hours && daysMap[day]) {
          const timeRanges = hours.ranges.map(range => new TimeRange(range));
          operatingHours.push(new OperatingHours({
            ...daysMap[day],
            timeRanges
          }));
        }
      }
    }

    return operatingHours;
  }

  private convertAddress(addressDto: any): Address {
    const address = new Address(addressDto);
    address.generateNavigationLinks();
    return address;
  }

  private async createProfileInternal(createOrganizationDto: OrganizationProfileDataDto): Promise<Organization> {
    const operatingHours = this.convertOperatingHours(createOrganizationDto);
    const address = this.convertAddress(createOrganizationDto.address);

    const organizationData = {
      description: createOrganizationDto.description,
      phone: createOrganizationDto.phone,
      website: createOrganizationDto.website,
      registrationNumber: createOrganizationDto.registrationNumber,
      address,
      operatingHours
    };

    return this.organizationRepository.create(organizationData);
  }

  async createProfile(createOrganizationDto: OrganizationProfileDataDto): Promise<Organization> {
    // Check if the caller is UserService by examining the stack trace
    const stack = new Error().stack;
    if (stack && stack.includes('UserService')) {
      return this.createProfileInternal(createOrganizationDto);
    }
    throw new Error('Direct profile creation is not allowed. Use UserService to create profiles.');
  }

  async updateProfile(id: string, updateOrganizationDto: Partial<Organization>): Promise<Organization> {
    const updatedOrganization = await this.organizationRepository.update(id, updateOrganizationDto);
    if (!updatedOrganization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return updatedOrganization;
  }

  async deleteProfile(id: string): Promise<boolean> {
    const deleted = await this.organizationRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return true;
  }

  async getProfile(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  // Helper methods that delegate to getProfile
  async getProfileById(id: string): Promise<Organization> {
    return this.getProfile(id);
  }

  async getProfileByUserId(userId: string): Promise<Organization> {
    const organization = await this.organizationRepository.findByUserId(userId);
    if (!organization) {
      throw new NotFoundException(`Organization with user ID ${userId} not found`);
    }
    return organization;
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async getOrganizationsByLocation(location: string): Promise<Organization[]> {
    return this.organizationRepository.findByLocation(location);
  }
}
