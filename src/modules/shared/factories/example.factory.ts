import { AddressDto } from '../../profiles/domain/dto/address.dto';
import { Gender } from '../../profiles/domain/enums/gender.enum';
import { MaritalStatus } from '../../profiles/domain/enums/marital-status.enum';
import { TimeDto } from '../../profiles/domain/dto/operating_hours/time.dto';

export class ExampleFactory {
  static createAddress(city: string, street: string, streetNumber: string, lat: number, lng: number): AddressDto {
    const address = new AddressDto();
    address.fullAddress = `${street} ${streetNumber}, ${city}`;
    address.street = street;
    address.streetNumber = streetNumber;
    address.city = city;
    address.latitude = lat;
    address.longitude = lng;
    return address;
  }

  static getTelAvivAddress(): AddressDto {
    return this.createAddress('תל אביב', 'הרצל', '1', 32.0853, 34.7818);
  }

  static getJerusalemAddress(): AddressDto {
    return this.createAddress('ירושלים', 'הרב קוק', '1', 31.7767, 35.2234);
  }

  static getExamplePhone(): string {
    return '+972501234567';
  }

  static getExampleLanguages(): string[] {
    return ['עברית', 'אנגלית'];
  }

  static getExampleInterests(): string[] {
    return ['תורה', 'הלכה', 'חסד'];
  }

  static getExampleGender(): Gender {
    return Gender.male;
  }

  static getExampleMaritalStatus(): MaritalStatus {
    return MaritalStatus.single;
  }

  static getExamplePassword(): string {
    return 'password123';
  }

  static getExampleConsumerEmail(): string {
    return 'user@example.com';
  }

  static getExampleOrganizationEmail(): string {
    return 'org@example.com';
  }

  static getExampleConsumerName(): string {
    return 'ישראל ישראלי';
  }

  static getExampleOrganizationName(): string {
    return 'ארגון לדוגמה';
  }

  static getTime(): TimeDto {
    const time = new TimeDto();
    time.hour = 9;
    time.minute = 0;
    return time;
  }

  static getTimeRange() {
    return {
      start: this.getTime(),
      end: { hour: 17, minute: 0 }
    };
  }

  static getAddress() {
    return this.getTelAvivAddress();
  }
}
