
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
        // Очищаем контейнер
        container.innerHTML = '';
        
        // Создаём изображение
        const img = document.createElement('img');
        img.className = 'card-icon';
        img.alt = type.toUpperCase();
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        
        // Получаем путь к изображению
        const imgPath = this.detector.getCardImagePath(type);
        img.src = imgPath;
        
        // Если изображение не загрузилось, показываем текст
        img.onerror = () => {
          container.textContent = type.toUpperCase();
          container.style.fontSize = '10px';
          container.style.fontWeight = 'bold';
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
        };
        
        container.appendChild(img);
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
      container.style.opacity = '0.4';
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
      this.showResult(`✅ Карта ${typeName} действительна!`, 'success');
    } else {
      this.showResult('❌ Неверный номер карты', 'error');
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