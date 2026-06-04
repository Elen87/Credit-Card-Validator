
export default class UI {
  constructor(validator, detector) {
    this.validator = validator;
    this.detector = detector;
    this.input = null;
    this.validateBtn = null;
    this.resultDiv = null;
  }
  
  init() {
    this.input = document.getElementById('card-number');
    this.validateBtn = document.getElementById('validate-btn');
    this.resultDiv = document.getElementById('result');
    
    this.loadCardImages();
    this.attachEvents();
  }
  
  loadCardImages() {
    const cardTypes = ['visa', 'mir', 'american-express', 'jcb', 'discover', 'diners'];
    
    cardTypes.forEach(type => {
      const container = document.getElementById(`card-${type}`);
      if (container) {
        const img = container.querySelector('.card-icon');
        if (img) {
          img.src = this.detector.getCardImagePath(type);
        }
      }
    });
  }
  
  attachEvents() {
    this.validateBtn.addEventListener('click', () => {
      this.validate();
    });
    
    this.input.addEventListener('input', () => {
      this.highlightCardType();
    });
    
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.validate();
      }
    });
  }
  
  highlightCardType() {
    const cardNumber = this.input.value;
    const cardType = this.detector.detect(cardNumber);
    
    const containers = document.querySelectorAll('.card-icon-container');
    containers.forEach(container => {
      container.classList.remove('active');
      container.style.opacity = '0.5';
      container.style.filter = 'grayscale(100%)';
    });
    
    if (cardType) {
      const activeContainer = document.getElementById(`card-${cardType}`);
      if (activeContainer) {
        activeContainer.classList.add('active');
        activeContainer.style.opacity = '1';
        activeContainer.style.filter = 'grayscale(0%)';
      }
    }
  }
  
  validate() {
    const cardNumber = this.input.value;
    
    if (!cardNumber.trim()) {
      this.showResult('Пожалуйста, введите номер карты', 'error');
      return;
    }
    
    const isValid = this.validator.isValid(cardNumber);
    const cardType = this.detector.detect(cardNumber);
    
    if (isValid) {
      const typeName = this.getCardTypeName(cardType);
      this.showResult(`Карта ${typeName} действительна!`, 'success');
    } else {
      this.showResult('Неверный номер карты', 'error');
    }
  }
  
  getCardTypeName(type) {
    const names = {
      'visa': 'Visa',
      'mir': 'МИР',
      'american-express': 'American Express',
      'jcb': 'JCB',
      'discover': 'Discover',
      'diners': 'Diners Club'
    };
    return names[type] || type;
  }
  
  showResult(message, type) {
    this.resultDiv.textContent = message;
    this.resultDiv.className = `result ${type}`;
    
    setTimeout(() => {
      if (this.resultDiv.textContent === message) {
        this.resultDiv.className = 'result';
      }
    }, 3000);
  }
}
