import { TemperaturePipe } from './temperature.pipe';

describe('TemperaturePipe', () => {
  let pipe: TemperaturePipe;

  beforeEach(() => {
    pipe = new TemperaturePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same value if value is null', () => {
    expect(pipe.transform(null, 'cel')).toBeNull();
  });

  it('should return the same value if value is undefined', () => {
    expect(pipe.transform(undefined as any, 'cel')).toBeUndefined();
  });

  it('should return the same value if value is an empty string', () => {
    expect(pipe.transform('', 'cel')).toBe('');
  });

  it('should return the same value if inputType and outputType are the same', () => {
    expect(pipe.transform(25, 'cel', 'cel')).toBe('25.00 ºC');
    expect(pipe.transform(77, 'fah', 'fah')).toBe('77.00 ºF');
  });

  it('should use the correct symbol if outputType is not provided', () => {
    expect(pipe.transform(25, 'cel')).toBe('25.00 ºC');
    expect(pipe.transform(77, 'fah')).toBe('77.00 ºF');
  });

  it('should handle numeric and string values correctly', () => {
    expect(pipe.transform('0', 'cel', 'fah')).toBe('32.00 ºF');
    expect(pipe.transform('32', 'fah', 'cel')).toBe('0.00 ºC');
  });

  it('should convert from Celsius to Fahrenheit', () => {
    expect(pipe.transform(0, 'cel', 'fah')).toBe('32.00 ºF');
    expect(pipe.transform(100, 'cel', 'fah')).toBe('212.00 ºF');
    expect(pipe.transform('25', 'cel', 'fah')).toBe('77.00 ºF');
  });

  it('should convert from Fahrenheit to Celsius', () => {
    expect(pipe.transform(32, 'fah', 'cel')).toBe('0.00 ºC');
    expect(pipe.transform(212, 'fah', 'cel')).toBe('100.00 ºC');
    expect(pipe.transform('77', 'fah', 'cel')).toBe('25.00 ºC');
  });
});
