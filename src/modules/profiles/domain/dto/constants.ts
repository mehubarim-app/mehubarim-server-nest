import { DayScheduleDto } from "./weekly-schedule/day-schedule.dto";
import { Gender } from "../enums/gender.enum";
import { MaritalStatus } from "../enums/marital-status.enum";

const telAvivAddress = {
    fullAddress: 'הרצל 1, תל אביב',
    city: 'תל אביב',
    street: 'הרצל',
    streetNumber: '1',
    latitude: 32.0853,
    longitude: 34.7818,
    wazeLink: 'https://waze.com/ul/hsv8z8jk7k',
    googleMapsLink: 'https://goo.gl/maps/example1'
};

const jerusalemAddress = {
    fullAddress: 'יפו 97, ירושלים',
    city: 'ירושלים',
    street: 'יפו',
    streetNumber: '97',
    latitude: 31.7857,
    longitude: 35.2007,
    wazeLink: 'https://waze.com/ul/hsv8z83k7i',
    googleMapsLink: 'https://goo.gl/maps/example2'
};

const defaultWeeklySchedule = {
    sunday: { title: 'sunday', timeRanges: [] },
    monday: { title: 'monday', timeRanges: [{ id: '1702347600000', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
    tuesday: { title: 'tuesday', timeRanges: [{ id: '1702347600001', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
    wednesday: { title: 'wednesday', timeRanges: [{ id: '1702347600002', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
    thursday: { title: 'thursday', timeRanges: [{ id: '1702347600003', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
    friday: { title: 'friday', timeRanges: [{ id: '1702347600004', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }] },
    saturday: { title: 'saturday', timeRanges: [] }
};

export const SWAGGER_EXAMPLES = {
    address: {
        telAviv: telAvivAddress,
        jerusalem: jerusalemAddress
    },
    weeklySchedule: defaultWeeklySchedule,
    organization: {
        organizationName: 'ישיבת מאור התורה',
        description: 'מרכז תורני לשיעורי תורה והלכה',
        phone: '+972501234567',
        website: 'https://example.org',
        registrationNumber: '580123456',
        targetAudience: ['אברכים', 'בעלי בתים', 'בחורי ישיבה'],
        languages: ['עברית', 'אנגלית', 'יידיש'],
        interests: ['תורה', 'הלכה', 'מוסר'],
        notes: 'פתוח בכל ימות השבוע',
        buildingImageUrl: 'https://example.org/building.jpg',
        logoUrl: 'https://example.org/logo.png',
        socialLinks: {
            facebook: 'https://facebook.com/example',
            whatsapp: 'https://wa.me/972501234567'
        },
        isVerified: true,
        isActive: true,
        address: jerusalemAddress,
        weeklySchedule: defaultWeeklySchedule
    },
    consumer: {
        fullName: 'ישראל ישראלי',
        homeAddress: jerusalemAddress,
        workAddress: telAvivAddress,
        phone: '+972501234567',
        gender: Gender.male,
        age: 25,
        maritalStatus: MaritalStatus.single,
        interests: ['תורה', 'הלכה', 'מוסר'],
        languages: ['עברית', 'אנגלית'],
        notes: 'מחפש חברותא ללימוד גמרא',
        isVerified: false,
        isActive: false
    }
};
