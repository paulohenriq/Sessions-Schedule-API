import lodash from 'lodash';
import moment from 'moment';
import convertDay from '../utils/week-days'

class SessionsService {

  /**
   * @module services/sessions
   * @method [services/sessions] mountProfessionalWeekDisponibility()
   * @description this method returns, from a professional, the available slots for each day of the week reserved for attendance
   * @param  {Array} professional_availability, {Number} slot_duration
   * @returns {Array}
   */
  async mountProfessionalWeekDisponibility (professional_availability, slot_duration = 30) {
    const week_book = [];

    // Browse through all the professional's availability
    for (let i = 0; i < professional_availability.length; i++) {

      // Generate entire calendar from tomorrow
      if (professional_availability[i].day > (new Date()).getDay()){
        let available_slots = professional_availability[i].interval_hours.map( interval => {
          return this.generateSlots(interval.start, interval.end, slot_duration);
        });

        // Remove second dimension from existing array in case of paused intervals
        available_slots = [].concat(...available_slots);

        // Mount week slots available to professional
        const filtered_slots = this.removeBookedDays(professional_availability[i].day, available_slots, professional_availability[i].booked_sessions);
        week_book.push({day: professional_availability[i].day, hours: filtered_slots});
      }
    }
    return week_book;
  }

  /**
   * @module services/sessions
   * @method [services/sessions] generateSlots()
   * @description this method generates the service slots from a start time and an end time, based on the duration of each slot sent by parameter.
   * @param  {String} hour_start, {String} hour_end, {Number} duration
   * @returns {Array}
   */
  generateSlots (hour_start, hour_end, duration) {
    const start = new Date(2020, 0, 1, hour_start.split(':')[0], hour_start.split(':')[1]);
    const end = new Date(2020, 0, 1, hour_end.split(':')[0], hour_end.split(':')[1]);
    const slots = [];

    while (start < end) {
      slots.push(start.toLocaleTimeString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }));
      start.setMinutes(start.getMinutes() + duration);
    }
    return slots.slice(0, -1);
  }

  /**
   * @module services/sessions
   * @method [services/sessions] removeBookedDays()
   * @description tthis method filters out all the available slots for the professional, only those that do not have an appointment.
   * @param  {Number} day, {Array} available_slots, {Array} booked_sessions
   * @returns {Array}
   */
  removeBookedDays (day, available_slots, booked_sessions) {
    const dayNow = new Date() ;
    dayNow.setHours(0,0,0,0);
    const beforeDays = day - dayNow.getDay();
    const arrayFiltered = booked_sessions.map( (elem) => {
      elem.date.setHours(0,0,0,0)
      dayNow.setDate(dayNow.getDate() + beforeDays)
      return moment(dayNow).isSame(moment(elem.date)) ? elem.hour : null;
    });
    return lodash.difference(available_slots, arrayFiltered);
  }

}

export default new SessionsService();
