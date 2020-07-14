const convertDay = (day) => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  if (Number.isInteger(day)) {
    if (day >=0 && day <=6) {
      return daysOfWeek[day];
    }
      return 'Invalid day';
  }

  return daysOfWeek.indexOf(day.toLowerCase()) === -1 ? 'Invalid day' : daysOfWeek.indexOf(day.toLowerCase());

}

export default convertDay
