import Component from '../core/component';
import buttonStyle from './button.scss';

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

    this.template.innerHTML = `
      <button class="custom-button ${type}">${text}</button>
    `;
  }
}
export default CustomButton;
