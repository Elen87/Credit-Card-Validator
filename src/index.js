
import './styles/main.css';
import CardValidator from './js/CardValidator';
import CardDetector from './js/CardDetector';
import UI from './js/UI';

// Создаём экземпляры классов
const validator = CardValidator;
const detector = CardDetector;
const ui = new UI(validator, detector);

ui.init();
