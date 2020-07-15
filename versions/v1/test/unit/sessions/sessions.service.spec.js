import moment from 'moment';

import SessionsService from '../../../src/services/sessions.service';
import convertDay from '../../../src/utils/week-days';

import availability from '../../data/availability.json';
import booked_session from '../../data/booked-sessions.json';
import professional_infos from '../../data/professional-infos.json';

describe('Services - Sessions', () => {
  describe('Method - mountProfessionalWeekDisponibility()', () => {
    test('should return empty array if empty array param is sended', async () => {
      const returns = SessionsService.mountProfessionalWeekDisponibility([]);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject([]);
    });

    test('should return array value if correct params is sended', async () => {
      const returns = SessionsService.mountProfessionalWeekDisponibility(availability);
      expect(typeof returns).toBe('object');
    });

  });

  describe('Method - removeBookedDays()', () => {
    test('should return the same array sended in second param if the thirdy param is empty array', async () => {
      const returns = SessionsService.removeBookedDays(6, ['08:00'], []);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject(['08:00']);
    });

    test('should return the same array sended in second param if the day not corresponding to schedule day', async () => {
      const dayNow = new Date() ;
      dayNow.setHours(0,0,0,0);
      const returns = SessionsService.removeBookedDays(dayNow.getDay()+2, ['08:00','08:30','09:00'], booked_session);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject(['08:00','08:30','09:00']);
    });

    test('should return array with slots subtracted if the correct params is sended', async () => {
      const dayNow = new Date() ;
      dayNow.setHours(0,0,0,0);
      const dayToBook = dayNow.getDay()+2;
      dayNow.setDate(dayNow.getDate() + 2);
      booked_session[0].date = moment(dayNow).format('YYYY-MM-DD');
      const returns = SessionsService.removeBookedDays(dayToBook, ['08:00','08:30','09:00','09:30','10:00'], booked_session);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject(['09:00','09:30','10:00']);
    });
  });

  describe('Method - generateListSessionsAllProfessionals()', () => {
    test('should return empty array if empty array param is sended', async () => {
      const returns = await SessionsService.generateListSessionsAllProfessionals([]);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject([]);
    });

    test('should return array with available sessions if correct param is sended', async () => {
      const mockProfessional = {
        _id: 'professional_code',
        professional: 'professional_name',
        availability
      }

      const mockReturn = {
        professional: {
          name: 'professional_name',
          code: 'professional_code'
        },
        availability: []
      }
      const returns = await SessionsService.generateListSessionsAllProfessionals([mockProfessional]);
      expect(typeof returns).toBe('object');
      expect(returns).toMatchObject([mockReturn]);
    });
  });

  describe('Method - verifySlotAvailability()', () => {
    test('should return null value if professional haven\'t availability', async () => {
      const mockProfessionalInfos = {...professional_infos};
      mockProfessionalInfos.availability = [];
      const returns = await SessionsService.verifySlotAvailability(mockProfessionalInfos, 'Thursday', '10:00');
      expect(typeof returns).toBe('object');
      expect(returns).toBe(null);
    });

    test('should return string with availability code if correct params is sended', async () => {
      const returns = await SessionsService.verifySlotAvailability(professional_infos, 'Thursday', '09:00');
      expect(typeof returns).toBe('string');
      expect(returns).toBe('5f0e9466fde750001126fdf4');
    });
  });

  describe('Method - getDateByDay()', () => {
    test('should return string value with date corresponding to day specified in params', async () => {
      const dayNow = new Date() ;
      dayNow.setHours(0,0,0,0);
      const returns = await SessionsService.getDateByDay(convertDay(dayNow.getDay()+1));
      dayNow.setDate(dayNow.getDate() + 1);
      const date_day = moment(dayNow).format('YYYY-MM-DD');
      expect(typeof returns).toBe('string');
      expect(returns).toBe(date_day);
    });
  });
});
