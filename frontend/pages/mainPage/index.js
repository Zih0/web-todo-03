import Component from '../../components/core/component.js';
import pageStyle from './style.css';

export default class MainPage extends Component {
  constructor() {
    super();
  }

  setStyle() {
    this.styles.textContent = pageStyle;
  }

  setTemplate() {
    return `
        <div class="main__container">
        <div id="main__kanvan__todo"></div>
        <div id="main__kanvan__progress"></div>
        <div id="main__kanvan__done"></div>
        </div>
        <custom-button type="primary" text="등록"></custom-button>
        <todo-kanvan></todo-kanvan>
      `;
  }
}
