import Component from '../core/component.js';
import HeaderStyle from './header.css';
import IconBell from '../../assets/icons/bell.svg';
import { disableBodyScroll } from '../../utils/styleUtil.js';
class Header extends Component {
  constructor() {
    super();
  }
  handleOpenPanel() {
    const panel = document.querySelector('#notification-panel').shadowRoot.querySelector('.panel-wrapper');
    panel.classList.add('open');
    disableBodyScroll();
  }
  setEvent() {
    this.addEvent('click', '.panel-button', this.handleOpenPanel.bind(this));
  }
  setStyle() {
    this.styles.textContent = HeaderStyle;
  }
  getText() {
    const text = this.getAttribute('text');
    return text ?? '';
  }
  setTemplate() {
    const text = this.getText();

    return `
        <header>
          <h1>${text}</h1>
          <div class="panel-button">
            <img src=${IconBell} alt='열기'/>
          </div>
        </header>`;
  }
}
export default Header;
