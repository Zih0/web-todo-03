import Component from '../core/component.js';
import HeaderStyle from './header.css';
import IconHamburger from '../../assets/icons/hamburger.svg';
class Header extends Component {
  constructor() {
    super();
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
            <img src=${IconHamburger} alt='열기'/>
          </div>
        </header>`;
  }
}
export default Header;
