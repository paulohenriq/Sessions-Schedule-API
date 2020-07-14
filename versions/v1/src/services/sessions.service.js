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
  mountProfessionalWeekDisponibility (professional_availability, slot_duration = 30) {
    const week_book = [];

    // Browse through all the professional's availability
    for (let i = 0; i < professional_availability.length; i++) {

      // Convert day string to integer representation
      // eslint-disable-next-line no-param-reassign
      professional_availability[i].day = convertDay(professional_availability[i].day);

      // Generate entire calendar from tomorrow
      if (professional_availability[i].day > (new Date()).getDay()){
        let available_slots = professional_availability[i].interval_hours.map( interval => {
          const slots = this.generateSlots(interval.start, interval.end, slot_duration);

          // Block booked slots before return availability for professional
          return this.removeBookedDays(professional_availability[i].day, slots, professional_availability[i].booked_sessions);
        });

        // Remove second dimension from existing array in case of paused intervals
        available_slots = [].concat(...available_slots);

        // Mount week slots available to professional
        week_book.push({day: convertDay(parseInt(professional_availability[i].day)), hours: available_slots});
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
   * @description this method filters out all the available slots for the professional, only those that do not have an appointment.
   * @param  {Number} day, {Array} available_slots, {Array} booked_sessions
   * @returns {Array}
   */
  removeBookedDays (day, available_slots, booked_sessions) {
    const dayNow = new Date() ;
    dayNow.setHours(0,0,0,0);
    const beforeDays = day - dayNow.getDay();
    dayNow.setDate(dayNow.getDate() + beforeDays);

    booked_sessions.forEach( (elem) => {
      const unavailable_session = moment(dayNow).isSame(moment(elem.date)) ? elem.hour : null;
      const index_of_slot = available_slots.indexOf(unavailable_session);

      if (unavailable_session !== null && index_of_slot > -1) {
        // Check if is the last available session from interval and remove it
        let blocked_slots = 1;
        if (index_of_slot < available_slots.length - 1) {
          blocked_slots = 2;
        }
        available_slots.splice(index_of_slot, blocked_slots);
      }
    });
    return available_slots;
  }

  /**
   * @module services/sessions
   * @method [services/sessions] generateListSessionsAllProfessionals()
   * @description this method generates the list of sessions available to all stored professionals.
   * @param  {Array} all_professionals
   * @returns {Array}
   */
  async generateListSessionsAllProfessionals(all_professionals) {
    const returned_data = []
    all_professionals.forEach( async (professional) => {
      returned_data.push({
        professional: {
          name: professional.professional,
          // eslint-disable-next-line no-underscore-dangle
          code: professional._id
        },
        availability: this.mountProfessionalWeekDisponibility(professional.availability)
      });
    });
    return returned_data;
  }

}

export default new SessionsService();
