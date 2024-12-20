import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from '../../domain/entities/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationProfileDataDto } from '../../domain/dto/organization-profile.dto';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(organization: Partial<Organization>): Promise<Organization> {
    const createdOrganization = new this.organizationModel(organization);
    return createdOrganization.save();
  }

  async findById(id: string): Promise<Organization> {
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async findByUserId(userId: string): Promise<Organization> {
    const organization = await this.organizationModel.findOne({ userId }).exec();
    if (!organization) {
      throw new NotFoundException(`Organization with user ID ${userId} not found`);
    }
    return organization;
  }

  async update(id: string, updateData: Partial<Organization>): Promise<Organization> {
    const updatedOrganization = await this.organizationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedOrganization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return updatedOrganization;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.organizationModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  async findByLocation(location: string): Promise<Organization[]> {
    return this.organizationModel
      .find({ 'address.city': { $regex: location, $options: 'i' } })
      .exec();
  }
}
