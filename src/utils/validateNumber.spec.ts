import {
  validateFacultativePositiveFloat,
  validateFacultativePositiveInteger
} from './validateNumber';

describe('validateNumber util', () => {
  it('should validate positive integers', () => {
    const validPositiveIntegers = ['1', '200'];
    const invalidPositiveIntegers = ['0', '-2', 'test', '2.3', '6,5'];

    for (const n of validPositiveIntegers) {
      expect(validateFacultativePositiveInteger(n)).toBeTruthy();
    }
    for (const n of invalidPositiveIntegers) {
      expect(validateFacultativePositiveInteger(n)).toBeFalsy();
    }
  });

  it('should validate positive floats', () => {
    const validPositiveFloats = ['1', '200', '1.2', '320,3'];
    const invalidPositiveFloats = ['0', '-2', 'test'];

    for (const n of validPositiveFloats) {
      expect(validateFacultativePositiveFloat(n)).toBeTruthy();
    }
    for (const n of invalidPositiveFloats) {
      expect(validateFacultativePositiveFloat(n)).toBeFalsy();
    }
  });
});
