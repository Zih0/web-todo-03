import styles from './button.scss';

class CustomButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.setAttribute('class', 'custom-button');
    const style = document.createElement('style');
    style.textContent = styles;
    const type = this.getAttribute('type');
    const text = this.getAttribute('text');
    button.innerText = text ?? '';

    if (type === 'primary') {
      button.classList.add('primary');
    } else if (type === 'normal') {
      button.classList.add('normal');
    }

    this.shadowRoot?.append(style, button);
  }
}
export default CustomButton;
