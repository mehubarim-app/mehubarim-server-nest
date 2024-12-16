import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Organization } from '../../domain/entities/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationProfileDto } from '../../domain/dto/organization-profile.dto';
import { ProfileService } from '../../domain/interfaces/profile.service.interface';
import { WeeklySchedule } from '../../domain/entities/weekly-schedule.entity';
import { Address } from '../../domain/entities/address.entity';
import { DayScheduleDto } from '../../domain/dto/weekly-schedule/day-schedule.dto';
import { DaySchedule } from '../../domain/entities/weekly-schedule/day-schedule.entity';
import { TimeRange } from '../../domain/entities/weekly-schedule/time-range.entity';
import { Time } from '../../domain/entities/weekly-schedule/time.entity';

@Injectable()
export class OrganizationService implements ProfileService {
  constructor(
    @Inject('IOrganizationRepository')
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  private convertWeeklySchedule(dto: OrganizationProfileDto): WeeklySchedule | undefined {
	  if (!dto.weeklySchedule) return undefined;
	
	  const daysOfWeek: (keyof WeeklySchedule)[] = [
	    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
	  ];
	
	  const schedule = daysOfWeek.reduce((acc, day) => {
	    if (dto.weeklySchedule[day]) {
	      (acc[day] as DaySchedule) = this.convertDaySchedule(dto.weeklySchedule[day]);
	    }
	    return acc;
	  }, {} as Partial<WeeklySchedule>);
	
	  return new WeeklySchedule(schedule);
	}
  
  private convertDaySchedule(dto: DayScheduleDto): DaySchedule {
    return new DaySchedule({
      title: dto.title,
      timeRanges: dto.timeRanges.map(range => {
        const timeRange = new TimeRange({
          startTime: new Time(range.startTime),
          endTime: new Time(range.endTime)
        });
        timeRange.id = range.id || Date.now().toString();
        return timeRange;
      })
    });
  }

  private convertAddress(addressDto: any): Address {
    const address = new Address(addressDto);
    address.generateNavigationLinks();
    return address;
  }

  private async createProfileInternal(createOrganizationDto: OrganizationProfileDto): Promise<Organization> {
    const { organizationName, description, phone, website, registrationNumber, targetAudience, languages, interests, notes, buildingImageUrl, logoUrl, socialLinks, isVerified, isActive, address, } = createOrganizationDto;
    const convertedAddress = address ? this.convertAddress(address) : undefined;
    const weeklySchedule = this.convertWeeklySchedule(createOrganizationDto);
    const organization = new Organization({
      organizationName,
      description,
      phone,
      website,
      address: convertedAddress,
      registrationNumber,
      targetAudience,
      languages,
      interests,
      notes,
      weeklySchedule,
      buildingImageUrl,
      logoUrl,
      socialLinks,
      isVerified,
      isActive
    });
    return this.organizationRepository.create(organization);
  }

  async createProfile(organizationDto: OrganizationProfileDto): Promise<Organization> {
    // Check if the caller is UserService by examining the stack trace
    const stack = new Error().stack;
    if (stack && stack.includes('UserService')) {
      return this.createProfileInternal(organizationDto);
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
