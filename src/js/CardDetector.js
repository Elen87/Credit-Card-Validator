
// Импортируем все изображения для Webpack
import visaImg from '../img/visa.png';
import mirImg from '../img/mir.png';
import americanExpressImg from '../img/american-express.png';
import jcbImg from '../img/jcb.png';
import discoverImg from '../img/discover.png';
import dinersImg from '../img/diners.png';

export default class CardDetector {
  static patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mir: /^220[0-4][0-9]{12}$/,
    'american-express': /^3[47][0-9]{13}$/,
    jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
  };
  
  static imageMap = {
    visa: visaImg,
    mir: mirImg,
    'american-express': americanExpressImg,
    jcb: jcbImg,
    discover: discoverImg,
    diners: dinersImg
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
    const isValid = Object.prototype.hasOwnProperty.call(CardDetector.patterns, cardType);
    if (!isValid) return null;
    
    return CardDetector.imageMap[cardType];
  }
}
