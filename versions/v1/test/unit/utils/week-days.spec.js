import convertDay from '../../../src/utils/week-days';

describe('Utils - Week Day Function', () => {
  test('should return invalid day string if wrong parameter is sended', async () => {
    const converted = convertDay('wrong_day');
    expect(typeof converted).toBe('string');
    expect(converted).toEqual('Invalid day');
  });

  test('should return invalid day string if wrong number day is sended in parameter', async () => {
    const converted = convertDay(10);
    expect(typeof converted).toBe('string');
    expect(converted).toEqual('Invalid day');
  });

  test('should return integer value if string param is sended', async () => {
    const converted = convertDay('saturday');
    expect(typeof converted).toBe('number');
    expect(converted).toBe(6);
  });

  test('should return string value if integer param is sended', async () => {
    const converted = convertDay(6);
    expect(typeof converted).toBe('string');
    expect(converted).toEqual('saturday');
  });
});
