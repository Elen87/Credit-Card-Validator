
import CardDetector from '../src/js/CardDetector';

describe('CardDetector', () => {
  describe('detect', () => {
    test('should detect Visa', () => {
      expect(CardDetector.detect('4111111111111111')).toBe('visa');
    });
    
    test('should detect MIR', () => {
      expect(CardDetector.detect('2201382000000013')).toBe('mir');
    });
    
    test('should detect American Express', () => {
      expect(CardDetector.detect('378282246310005')).toBe('american-express');
    });
    
    test('should detect JCB', () => {
      expect(CardDetector.detect('3530111333300000')).toBe('jcb');
    });
    
    test('should detect Discover', () => {
      expect(CardDetector.detect('6011111111111117')).toBe('discover');
    });
    
    test('should detect Diners Club', () => {
      expect(CardDetector.detect('30569309025904')).toBe('diners');
    });
    
    test('should return null for unknown card', () => {
      expect(CardDetector.detect('1234567890123456')).toBe(null);
    });
    
    test('should return null for empty input', () => {
      expect(CardDetector.detect('')).toBe(null);
      expect(CardDetector.detect(null)).toBe(null);
    });
    
    test('should handle spaces in card number', () => {
      expect(CardDetector.detect('4111 1111 1111 1111')).toBe('visa');
    });
    
    test('should handle dashes in card number', () => {
      expect(CardDetector.detect('4111-1111-1111-1111')).toBe('visa');
    });
  });
  
  describe('getCardImagePath', () => {
    test('should return null for invalid input', () => {
      expect(CardDetector.getCardImagePath(null)).toBe(null);
      expect(CardDetector.getCardImagePath('')).toBe(null);
      expect(CardDetector.getCardImagePath('unknown')).toBe(null);
    });
    
    test('should return image for known card type', () => {
      expect(CardDetector.getCardImagePath('visa')).toBeTruthy();
      expect(CardDetector.getCardImagePath('mir')).toBeTruthy();
      expect(CardDetector.getCardImagePath('american-express')).toBeTruthy();
      expect(CardDetector.getCardImagePath('jcb')).toBeTruthy();
      expect(CardDetector.getCardImagePath('discover')).toBeTruthy();
      expect(CardDetector.getCardImagePath('diners')).toBeTruthy();
    });
  });
})