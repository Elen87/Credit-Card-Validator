import CardValidator from '../src/js/CardValidator';

describe('CardValidator', () => {
  describe('luhnCheck', () => {
    test('should return true for valid Visa card', () => {
      expect(CardValidator.luhnCheck('4111111111111111')).toBe(true);
    });
    
    test('should return true for valid Mastercard', () => {
      expect(CardValidator.luhnCheck('5555555555554444')).toBe(true);
    });
    
    test('should return true for valid MIR card', () => {
      expect(CardValidator.luhnCheck('2201382000000013')).toBe(true);
    });
    
    test('should return false for invalid card', () => {
      expect(CardValidator.luhnCheck('1234567890123456')).toBe(false);
    });
    
    test('should handle spaces in card number', () => {
      expect(CardValidator.luhnCheck('4111 1111 1111 1111')).toBe(true);
    });
    
    test('should return false for empty string', () => {
      expect(CardValidator.luhnCheck('')).toBe(false);
    });
  });
  
  describe('isValid', () => {
    test('should validate correct Visa card', () => {
      expect(CardValidator.isValid('4111111111111111')).toBe(true);
    });
    
    test('should validate correct Mastercard', () => {
      expect(CardValidator.isValid('5555555555554444')).toBe(true);
    });
    
    test('should reject card with letters', () => {
      expect(CardValidator.isValid('4111abcd11111111')).toBe(false);
    });
    
    test('should reject too short card', () => {
      expect(CardValidator.isValid('1234')).toBe(false);
    });
    
    test('should reject too long card', () => {
      expect(CardValidator.isValid('411111111111111111111')).toBe(false);
    });
  });
})
