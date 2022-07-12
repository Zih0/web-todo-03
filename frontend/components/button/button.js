import Component from '../core/component.js';
import buttonStyle from './button.css';

class CustomButton extends Component {
  constructor() {
    super();
  }

  setStyle() {
    this.styles.textContent = buttonStyle;
  }

  getText() {
    const text = this.getAttribute('text');
    return text ?? '';
  }

  getType() {
    const type = this.getAttribute('type');
    return type;
  }

  setTemplate() {
    const type = this.getType();
    const text = this.getText();

    return `
      <button class="custom-button ${type ?? 'normal'}">${text}</button>
    `;
  }
}
export default CustomButton;
