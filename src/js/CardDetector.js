
export default class CardDetector {
  static patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mir: /^220[0-4][0-9]{12}$/,
    'american-express': /^3[47][0-9]{13}$/,
    jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
  };
  
  static detect(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') return null;
    const cleaned = cardNumber.replace(/\s/g, '').replace(/-/g, '');
    
    for (const [cardType, pattern] of Object.entries(CardDetector.patterns)) {
      if (pattern.test(cleaned)) {
        return cardType;
      }
    }
    return null;
  }
  
  static getCardImagePath(cardType) {
    if (!cardType) return null;
    
    // Проверка существования типа карты
    const isValid = Object.prototype.hasOwnProperty.call(CardDetector.patterns, cardType);
    if (!isValid) return null;
    
    // Для тестов используем заглушку
    if (process.env.NODE_ENV === 'test') {
      return 'test-image-stub';
    }
    
    return `/img/${cardType}.png`;
  }
}
